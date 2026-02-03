const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export function apiUrl(path: string): string {
  const base = API_URL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : "/" + path;
  return base + p;
}

/** Use only the Express backend for auth and content. Next.js has no duplicate API routes. */
export function fetchApi(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  if (!API_URL) {
    return Promise.reject(
      new Error(
        "NEXT_PUBLIC_API_URL is not set. Set it to your Express backend URL (e.g. http://localhost:4000 or your Render URL)."
      )
    );
  }
  const url = apiUrl(path);
  return fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
}
