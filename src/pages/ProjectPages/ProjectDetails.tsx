import { useParams, useNavigate } from "react-router";
import { useShowProject } from "../../hooks/useProjects";

import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { DataTable } from "../../components/common/Datatable";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

import {
  TbArrowLeft,
  TbCalendar,
  TbUsers,
  TbFolder,
  TbWorld,
  TbLayersIntersect,
} from "react-icons/tb";

import { CiPlay1 } from "react-icons/ci";
import { useProjectProgress } from "../../hooks/useProjectProgress";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useShowProject(id!);
  const { data: progressData = [], isLoading: loadingProgress } =
    useProjectProgress(id!);

  if (isLoading)
    return <div className="p-6 text-gray-600 text-lg">Loading project...</div>;

  if (!data)
    return <div className="p-6 text-gray-600 text-lg">Project not found.</div>;

  const project = data;

  const statusStyle: Record<string, string> = {
    active: "bg-green-100 text-green-700 border border-green-400",
    pending: "bg-yellow-100 text-yellow-700 border border-yellow-400",
    inactive: "bg-gray-100 text-gray-700 border border-gray-400",
  };

  const progressColumns: any = [
    {
      accessorKey: "stage_no",
      header: "Stage No",
      cell: ({ row }: any) => (
        <span className="font-medium">{row.original.stage_no}</span>
      ),
    },

    {
      accessorKey: "current_status",
      header: "Current Status",
      cell: ({ row }: any) => {
        const status = row.original.current_status;

        const statusColor: Record<string, string> = {
          draft: "bg-gray-200 text-gray-700",
          active: "bg-blue-200 text-blue-700",
          completed: "bg-green-200 text-green-700",
        };

        return (
          <Badge className={statusColor[status] || "bg-gray-200 text-gray-700"}>
            {status}
          </Badge>
        );
      },
    },

    {
      accessorKey: "comment",
      header: "Comment",
      cell: ({ row }: any) => (
        <span className="text-gray-600">{row.original.comment || "-"}</span>
      ),
    },

    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }: any) => (
        <span className="text-sm text-gray-600">
          {new Date(row.original.created_at).toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* BACK + ACTIVATE BUTTON */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <TbArrowLeft size={18} /> Back to Projects
        </Button>
      </div>

      {/* HEADER CARD */}
      <Card className="p-6 shadow-sm border-brand-100">
        <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>

        {/* Status + Client */}
        <div className="flex items-center gap-4 mt-3">
          <Badge
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              statusStyle[project.status] ?? "bg-gray-200"
            }`}
          >
            {project.status.toUpperCase()}
          </Badge>

          <div className="flex items-center gap-2 text-brand-600 text-sm">
            <TbUsers /> {project.client_name || "Unknown Client"}
          </div>
        </div>

        {/* Description */}
        <div className="mt-5">
          <h2 className="font-semibold text-gray-800 mb-1">Description</h2>
          <p className="text-gray-700">{project.description}</p>
        </div>

        {/* Dates */}
        <div className="flex gap-8 text-gray-600 mt-5 text-sm">
          <span className="flex items-center gap-2">
            <TbCalendar /> Created: Jun 15, 2024
          </span>
          <span className="flex items-center gap-2">
            <TbCalendar /> Updated: Nov 20, 2024
          </span>
        </div>
      </Card>

      {/* CATEGORIES */}
      <Card className="p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <TbLayersIntersect size={20} className="text-brand-500" />
          <h2 className="font-semibold text-gray-800">Categories</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.categories.map((cat: any) => (
            <Badge
              key={cat.id}
              className="px-3 py-1 bg-brand-50 text-brand-700 border border-brand-300"
            >
              {cat.name}
            </Badge>
          ))}
        </div>
      </Card>

      {/* COLLABORATORS */}
      <Card className="p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <TbUsers size={20} className="text-brand-500" />
          <h2 className="font-semibold text-gray-800">Collaborators</h2>
        </div>

        {project.collaborators.length === 0 ? (
          <p className="text-gray-500 text-sm">No collaborators added yet.</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {project.collaborators.map((col: any, i: number) => (
              <Badge
                key={i}
                className="bg-gray-100 text-gray-800 px-3 py-1 border border-gray-300"
              >
                {col.name}
              </Badge>
            ))}
          </div>
        )}
      </Card>

      {/* MEDIA SOURCES */}
      <Card className="p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <TbWorld size={20} className="text-brand-500" />
          <h2 className="font-semibold text-gray-800">
            Media Sources ({project.media_sources.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {project.media_sources.map((src: any) => (
            <div
              key={src.id}
              className="border p-4 rounded-md hover:bg-gray-50 transition shadow-sm"
            >
              <p className="font-medium text-gray-900">{src.name}</p>
              <p className="text-xs text-gray-500">{src.category_name}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* THEMATIC AREAS (Accordion) */}
      <Card className="p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <TbFolder size={20} className="text-brand-500" />
          <h2 className="font-semibold text-gray-800">
            Thematic Areas ({project.thematic_areas.length})
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {project.thematic_areas.map((area: any) => (
            <AccordionItem
              key={area.id}
              value={area.id}
              className="border rounded-lg shadow-sm"
            >
              <AccordionTrigger className="px-4 py-3 text-lg font-medium">
                <Badge className="mr-3 bg-brand-100 text-brand-700 border border-brand-300">
                  {area.area}
                </Badge>
                {area.title}
              </AccordionTrigger>

              <AccordionContent className="px-4 pb-4 space-y-2">
                <p className="text-gray-700">{area.description}</p>

                <h4 className="font-semibold text-gray-800 mt-3">
                  Monitoring Objectives:
                </h4>

                <ul className="list-disc ml-6 text-gray-600">
                  {JSON.parse(area.monitoring_objectives[0]).map(
                    (obj: string, i: number) => (
                      <li key={i}>{obj}</li>
                    )
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>

      {/* PROJECT STAGES - DATATABLE */}
      <Card className="p-6 shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-800">Project Stages</h2>
          <Button className="bg-brand-500 text-white flex items-center gap-2">
            <CiPlay1 size={18} /> Activate Project
          </Button>
        </div>

        <DataTable
          columns={progressColumns}
          data={progressData}
          isLoading={loadingProgress}
          page={1}
          pageSize={10}
          total={progressData.length}
          onPageChange={() => {}}
        />
      </Card>
    </div>
  );
}
