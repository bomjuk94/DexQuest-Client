export const getIdFromUrl = (url: string): string | undefined => {
    if (!url) return;
    const segments = url.split('/').filter(Boolean);
    return segments[segments.length - 1];
};