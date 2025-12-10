import { z } from "zod";

export const ProjectReportAvenueSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
});

export type ProjectReportAvenueType = z.infer<typeof ProjectReportAvenueSchema>;
