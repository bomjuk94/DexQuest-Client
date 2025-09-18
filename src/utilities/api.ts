/**
 * apiFetch.ts — DexQuest
 * Resilient fetch with:
 * - Timeout + retry for transient errors / cold starts
 * - One-time "Waking server…" toast on retry or slow first response
 * - URL join normalization (avoids double slashes)
 * - Optional Authorization header from localStorage token
 * - DEV-only simulation knobs for local testing
 */

const BASE_URL = import.meta.env.VITE_API_URL;

export type ApiOptions = RequestInit & {
    timeoutMs?: number;      // default 8000
    retries?: number;        // default 1
    retryDelayMs?: number;   // default 1500
    slowMs?: number;         // default 3000 (show toast if first attempt exceeds this)

    // DEV simulation (ignored in production unless you pass them explicitly)
    devSimulateColdMs?: number;   // ask server to delay via header (requires dev middleware)
    devClientDelayMs?: number;    // force client-side delay before first attempt
    devSimulate503Once?: boolean; // ask server to return one 503 via header

    // Optional toast override (single-arg: message)
    toast?: (message: string) => void;
};

function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
}

function isAbortError(err: unknown) {
    return err instanceof DOMException && err.name === 'AbortError';
}

function shouldRetry(res?: Response, err?: unknown) {
    if (res) return [408, 429, 500, 502, 503, 504].includes(res.status);
    if (isAbortError(err)) return true;
    if (err instanceof TypeError) return true; // network error
    return false;
}

async function fetchWithTimeout(url: string, opts: RequestInit, timeoutMs: number) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), timeoutMs);
    try {
        return await fetch(url, { ...opts, signal: controller.signal });
    } finally {
        clearTimeout(t);
    }
}

export const apiFetch = async (
    path: string,
    options: ApiOptions = {}
): Promise<Response> => {
    const {
        timeoutMs = 8000,
        retries = 1,
        retryDelayMs = 1500,
        slowMs = 3000,

        // DEV
        devSimulateColdMs,
        devClientDelayMs,
        devSimulate503Once,

        toast, // optional override

        ...opts
    } = options;

    // Normalize join to avoid // and missing /
    const base = String(BASE_URL ?? '').replace(/\/+$/, '');
    const suffix = String(path ?? '');
    const url = `${base}${suffix.startsWith('/') ? '' : '/'}${suffix}`;

    // Build headers
    const token = localStorage.getItem('token');

    const devHeaders: Record<string, string> = {};
    if (import.meta.env.MODE === 'development') {
        if (devSimulateColdMs && devSimulateColdMs > 0) {
            devHeaders['x-simulate-cold'] = String(devSimulateColdMs);
        }
        if (devSimulate503Once) {
            devHeaders['x-simulate-503'] = '1';
        }
    }

    const baseHeaders: HeadersInit = {
        ...(opts.headers || {}),
        ...devHeaders,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const requestInit: RequestInit = {
        credentials: 'include',
        ...opts,
        headers: baseHeaders,
    };

    // Optional client-side simulated delay for testing
    if (import.meta.env.MODE === 'development' && devClientDelayMs && devClientDelayMs > 0) {
        await sleep(devClientDelayMs);
    }

    // Toast emitter (tries provided callback, then globals)
    const emitToast = (msg: string) => {
        if (typeof toast === 'function') return void toast(msg);
        const g: any = globalThis as any;
        if (typeof g.__showToast === 'function') return void g.__showToast(msg);
        if (typeof g.showToast === 'function') {
            try { g.showToast(msg); return; } catch { }
            try { g.showToast('warning', msg); return; } catch { }
        }
        // fallback: no-op
    };

    const start = Date.now();
    let attempt = 0;
    let lastErr: unknown;
    let lastRes: Response | undefined;
    let toastShown = false;

    const maybeToastForSlow = () => {
        if (!toastShown && Date.now() - start > slowMs) {
            emitToast('Waking server… one sec ⏳');
            toastShown = true;
        }
    };
    const showToastForRetry = () => {
        if (!toastShown) {
            emitToast('Waking server… one sec ⏳');
            toastShown = true;
        }
    };

    while (attempt <= retries) {
        try {
            const res = await fetchWithTimeout(url, requestInit, timeoutMs);

            // If first attempt finished but was slow, inform the user
            if (attempt === 0) maybeToastForSlow();

            if (!res.ok) {
                if (attempt < retries && shouldRetry(res)) {
                    lastRes = res;
                    showToastForRetry();
                    await sleep(retryDelayMs);
                    attempt++;
                    continue;
                }

                // Parse and throw error as message
                let message = 'API error';
                try {
                    const data = await res.json();
                    message =
                        (data as any).error ||
                        ((data as any).errors ? (data as any).errors.join(', ') : message);
                } catch {
                    try { message = await res.text(); } catch { }
                }
                throw new Error(message || 'API error');
            }

            // Success
            return res;
        } catch (err) {
            // Retry on timeout/network/transient
            if (attempt < retries && shouldRetry(undefined, err)) {
                showToastForRetry();
                lastErr = err;
                await sleep(retryDelayMs);
                attempt++;
                continue;
            }

            // No more retries: surface last response error if present
            if (lastRes) {
                let message = 'API error';
                try {
                    const data = await lastRes.json();
                    message =
                        (data as any).error ||
                        ((data as any).errors ? (data as any).errors.join(', ') : message);
                } catch {
                    try { message = await lastRes.text(); } catch { }
                }
                throw new Error(message || 'API error');
            }

            // Terminal error
            throw err;
        }
    }

    throw new Error('API request failed');
};


// const BASE_URL = import.meta.env.VITE_API_URL;

// export const apiFetch = async (
//     path: string,
//     options: RequestInit = {}
// ): Promise<Response> => {
//     const res = await fetch(`${BASE_URL}${path}`, {
//         credentials: 'include',
//         ...options
//     });

//     if (!res.ok) {
//         const error = await res.text();
//         throw new Error(error || 'API error');
//     }

//     return res;
// };
