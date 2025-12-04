import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PaginatedResponse, ProjectType } from "../types";
import projectService from "../service/projectService";

export const useProjects = (params: Record<string, any>) => {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: async () => {
      const { request } =
        projectService.list<PaginatedResponse<ProjectType>>(params);
      const res = await request;
      return res.data;
    },
  });
};

export const useProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<ProjectType>) =>
      projectService.create(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useShowProject = (id: string | number, enabled = true) => {
  return useQuery({
    queryKey: ["projects", id],
    enabled: !!id && enabled,
    queryFn: async () => {
      const { request } = projectService.show(id);
      const res = await request;
      return res.data;
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { id: string; data: Partial<ProjectType> }) =>
      projectService.update(payload.id, payload.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
