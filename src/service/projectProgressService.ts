import apiClient from "./apiClient";

const projectProgressService = {
  show: (projectId: string | number) => {
    const url = `/projects/${projectId}/progress/`;
    const controller = new AbortController();

    const request = apiClient.get(url, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  },
};

export default projectProgressService;
