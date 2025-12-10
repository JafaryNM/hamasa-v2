import { z } from "zod";

export const ProjectReportConsultationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
});

export type ProjectReportConsultationType = z.infer<
  typeof ProjectReportConsultationSchema
>;
