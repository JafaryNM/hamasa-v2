import { useQuery } from "@tanstack/react-query";
import projectProgressService from "../service/projectProgressService";
import { ProjectProgress } from "../types";

export const useProjectProgress = (id: string | number) => {
  return useQuery<ProjectProgress[]>({
    queryKey: ["project-progress", id],
    enabled: !!id,
    queryFn: async () => {
      const { request } = projectProgressService.show(id);
      const res = await request;
      return res.data;
    },
  });
};
