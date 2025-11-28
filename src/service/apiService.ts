import apiClient from "./apiClient";

export const createService = (endpoint: string) => {
  const normalize = (url: string) => (url.startsWith("/") ? url : `/${url}`);

  const buildUrl = (extendedUrl = "", id?: string | number) => {
    const base = normalize(endpoint); // → "/auth"
    const extra = normalize(extendedUrl); // → "/login"
    const full = id ? `${base}${extra}/${id}` : `${base}${extra}`;
    return full;
  };

  return {
    list: <T>(params?: unknown, extendedUrl = "") => {
      const controller = new AbortController();
      const url = buildUrl(extendedUrl);

      const request = apiClient.get<T>(url, {
        params,
        signal: controller.signal,
      });

      return { request, cancel: () => controller.abort() };
    },

    show: (id: string | number, extendedUrl = "") => {
      const controller = new AbortController();
      const url = buildUrl(extendedUrl, id);

      const request = apiClient.get(url, {
        signal: controller.signal,
      });

      return { request, cancel: () => controller.abort() };
    },

    create: <T>(payload: T, extendedUrl = "") =>
      apiClient.post(buildUrl(extendedUrl), payload),

    update: <T>(id: string | number, payload: T, extendedUrl = "") =>
      apiClient.patch(buildUrl(extendedUrl, id), payload),

    delete: (id: string | number, extendedUrl = "") =>
      apiClient.delete(buildUrl(extendedUrl, id)),
  };
};
