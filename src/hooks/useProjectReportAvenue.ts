import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PaginatedResponse, ProjectReportAvenueData } from "../types";

import projectReportAvenueService from "../service/projectReportAvenueService";

export const useProjectReportAvenues = (params: Record<string, any>) => {
  return useQuery({
    queryKey: ["project-report-avenues", params],
    queryFn: async () => {
      const { request } =
        projectReportAvenueService.list<
          PaginatedResponse<ProjectReportAvenueData>
        >(params);
      const res = await request;
      return res.data;
    },
  });
};

export const useAddProjectReportAvenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<ProjectReportAvenueData>) =>
      projectReportAvenueService.create(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-report-avenues"] });
    },
  });
};

export const useShowProjectReportAvenue = (
  id: string | number,
  enabled = true
) => {
  return useQuery({
    queryKey: ["project-report-avenues", id],
    enabled: !!id && enabled,
    queryFn: async () => {
      const { request } = projectReportAvenueService.show(id);
      const res = await request;
      return res.data;
    },
  });
};

export const useUpdateProjectReportAvenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      id: string;
      data: Partial<ProjectReportAvenueData>;
    }) => projectReportAvenueService.update(payload.id, payload.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-report-avenues"] });
    },
  });
};

export const useDeleteProjectReportAvenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectReportAvenueService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-report-avenues"] });
    },
  });
};
