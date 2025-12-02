import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MediaData, PaginatedResponse } from "../types";
import mediaService from "../service/mediaService";

export const useMedia = (params: Record<string, any>) => {
  return useQuery({
    queryKey: ["medias", params],
    queryFn: async () => {
      const { request } =
        mediaService.list<PaginatedResponse<MediaData>>(params);
      const res = await request;
      return res.data;
    },
  });
};

export const useAddMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<MediaData>) => mediaService.create(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medias"] });
    },
  });
};

export const useShowMedia = (id: string | number, enabled = true) => {
  return useQuery({
    queryKey: ["medias", id],
    enabled: !!id && enabled,
    queryFn: async () => {
      const { request } = mediaService.show(id);
      const res = await request;
      return res.data;
    },
  });
};

export const useUpdateMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { id: string; data: Partial<MediaData> }) =>
      mediaService.update(payload.id, payload.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medias"] });
    },
  });
};

export const useDeleteMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => mediaService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medias"] });
    },
  });
};
