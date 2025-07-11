export function throttle<T extends (...args: any[]) => void>(func: T, delay: number) {
    let lastCall = 0
    let timeout: ReturnType<typeof setTimeout> | null = null

    const throttled = function (...args: any[]) {
        const now = new Date().getTime()

        if (now - lastCall >= delay) {
            lastCall = now
            func(...args)
        } else if (!timeout) {
            timeout = setTimeout(() => {
                lastCall = new Date().getTime()
                timeout = null
                func(...args)
            }, delay - (now - lastCall))
        }
    }

    throttled.cancel = () => {
        if (timeout) {
            clearTimeout(timeout)
            timeout = null
        }
    }

    return throttled as T & { cancel: () => void }
}
