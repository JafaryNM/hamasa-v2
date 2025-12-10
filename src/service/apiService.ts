import apiClient from "./apiClient";

export const createService = (endpoint: string) => {
  // Normalize only leading slash
  const normalize = (url: string) =>
    url ? (url.startsWith("/") ? url : `/${url}`) : "";

  // Clean duplicates but DO NOT break "?..."
  const clean = (url: string) => url.replace(/([^:])\/{2,}/g, "$1/");

  const buildUrl = (
    extendedUrl = "",
    id?: string | number,
    addTrailingSlash = true
  ) => {
    const base = normalize(endpoint);
    const extra = normalize(extendedUrl);

    let url = id ? `${base}${extra}/${id}` : `${base}${extra}`;

    // Add trailing slash if required
    if (addTrailingSlash && !url.endsWith("/")) {
      url += "/";
    }

    return clean(url);
  };

  return {
    list: <T>(params?: unknown, extendedUrl = "") => {
      const controller = new AbortController();

      const url = buildUrl(extendedUrl, undefined, true);

      const request = apiClient.get<T>(url, {
        params,
        signal: controller.signal,
      });

      return { request, cancel: () => controller.abort() };
    },

    show: (id: string | number, extendedUrl = "") => {
      const controller = new AbortController();

      const url = buildUrl(extendedUrl, id, true);

      const request = apiClient.get(url, {
        signal: controller.signal,
      });

      return { request, cancel: () => controller.abort() };
    },

    create: <T>(payload: T, extendedUrl = "") =>
      apiClient.post(buildUrl(extendedUrl, undefined, true), payload),

    update: <T>(id: string | number, payload: T, extendedUrl = "") =>
      apiClient.patch(buildUrl(extendedUrl, id, true), payload),

    delete: (id: string | number, extendedUrl = "") =>
      apiClient.delete(buildUrl(extendedUrl, id, true)),
  };
};
