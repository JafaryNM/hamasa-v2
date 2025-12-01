import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Client, PaginatedResponse, ProjectCategory } from "../types";
import projectCategoryService from "../service/projectCategoryService";

export const useProjectCategories = (params: Record<string, any>) => {
  return useQuery({
    queryKey: ["project-categories", params],
    queryFn: async () => {
      const { request } =
        projectCategoryService.list<PaginatedResponse<ProjectCategory>>(params);
      const res = await request;
      return res.data;
    },
  });
};

export const useAddProjectCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<ProjectCategory>) =>
      projectCategoryService.create(payload), // POST /clients/

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-categories"] });
    },
  });
};

export const useShowProjectCategory = (id: string | number, enabled = true) => {
  return useQuery({
    queryKey: ["project-categories", id],
    enabled: !!id && enabled,
    queryFn: async () => {
      const { request } = projectCategoryService.show(id);
      const res = await request;
      return res.data;
    },
  });
};

export const useUpdateProjectCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { id: string; data: Partial<ProjectCategory> }) =>
      projectCategoryService.update(payload.id, payload.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-categories"] });
    },
  });
};

export const useDeleteProjectCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectCategoryService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-categories"] });
    },
  });
};
