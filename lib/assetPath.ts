
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function assetPath(path: string): string {
    if (/^(https?:\/\/|data:|blob:)/i.test(path)) {
        return path;
    }

    return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
