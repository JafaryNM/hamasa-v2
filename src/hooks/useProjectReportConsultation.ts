import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PaginatedResponse, ProjectReportConsultationData } from "../types";
import projectReportConsultationService from "../service/projectReportConsultationService";

export const useProjectReportConsultations = (params: Record<string, any>) => {
  return useQuery({
    queryKey: ["project-report-consultations", params],
    queryFn: async () => {
      const { request } =
        projectReportConsultationService.list<
          PaginatedResponse<ProjectReportConsultationData>
        >(params);
      const res = await request;
      return res.data;
    },
  });
};

export const useAddProjectReportConsultation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<ProjectReportConsultationData>) =>
      projectReportConsultationService.create(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project-report-consultations"],
      });
    },
  });
};

export const useShowProjectReportConsultation = (
  id: string | number,
  enabled = true
) => {
  return useQuery({
    queryKey: ["project-report-consultations", id],
    enabled: !!id && enabled,
    queryFn: async () => {
      const { request } = projectReportConsultationService.show(id);
      const res = await request;
      return res.data;
    },
  });
};

export const useUpdateProjectReportConsultation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      id: string;
      data: Partial<ProjectReportConsultationData>;
    }) => projectReportConsultationService.update(payload.id, payload.data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project-report-consultations"],
      });
    },
  });
};

export const useDeleteProjectReportConsultation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectReportConsultationService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project-report-consultations"],
      });
    },
  });
};
