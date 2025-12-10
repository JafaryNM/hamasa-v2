import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PaginatedResponse, ProjectReportTimeData } from "../types";

import projectReportTimeService from "../service/projectReportTimeService";

export const useProjectReportTimes = (params: Record<string, any>) => {
  return useQuery({
    queryKey: ["project-report-times", params],
    queryFn: async () => {
      const { request } =
        projectReportTimeService.list<PaginatedResponse<ProjectReportTimeData>>(
          params
        );
      const res = await request;
      return res.data;
    },
  });
};

export const useAddProjectReportTime = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<ProjectReportTimeData>) =>
      projectReportTimeService.create(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-report-times"] });
    },
  });
};

export const useShowProjectReportTime = (
  id: string | number,
  enabled = true
) => {
  return useQuery({
    queryKey: ["project-report-times", id],
    enabled: !!id && enabled,
    queryFn: async () => {
      const { request } = projectReportTimeService.show(id);
      const res = await request;
      return res.data;
    },
  });
};

export const useUpdateProjectReportTime = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      id: string;
      data: Partial<ProjectReportTimeData>;
    }) => projectReportTimeService.update(payload.id, payload.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-report-times"] });
    },
  });
};

export const useDeleteProjectReportTime = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectReportTimeService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-report-times"] });
    },
  });
};
