import { useState } from "react";

import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { Input } from "../../components/ui/input";
import { TbEye, TbPencil, TbPlus, TbSearch, TbTrash } from "react-icons/tb";
import { Card } from "../../components/ui/card";
import { DataTable } from "../../components/common/Datatable";
import { MediaData, ProjectType } from "../../types";
import { useDeleteMedia } from "../../hooks/useMedias";
import { useProjects } from "../../hooks/useProjects";
import { useNavigate } from "react-router";

export default function Project() {
  const [page, setPage] = useState(1);
  const [nameInput, setNameInput] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const navigate = useNavigate();

  const { data, isLoading } = useProjects({
    page,
    page_size: 10,
    name: nameFilter || null,
    country: null,
    sort: "desc",
  });

  const deleteMedia = useDeleteMedia();

  const fields =
    data?.results?.map((field: ProjectType, index: number) => ({
      ...field,
      sn: index + 1 + (page - 1) * 10,
    })) || [];

  const applySearch = () => {
    setNameFilter(nameInput);
    setPage(1);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const styleMap: Record<string, string> = {
      active: "bg-green-100 text-green-700 border border-green-400",
      pending: "bg-yellow-100 text-yellow-700 border border-yellow-400",
      inactive: "bg-gray-100 text-gray-700 border border-gray-400",
      draft: "bg-gray-300 text-gray-900",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          styleMap[status] || "bg-gray-200"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleDelete = (record: MediaData) => {
    if (!record?.id) return;

    deleteMedia.mutate(record.id, {
      onSuccess: () => toast.success("Project deleted successfully"),
      onError: (err: any) => {
        toast.error(err?.response?.data?.detail || "Failed to delete project");
      },
    });
  };

  const columns: any = [
    { accessorKey: "sn", header: "S/N" },

    {
      accessorKey: "title",
      header: "Project Title",
      cell: ({ row }: any) => {
        const { title, description } = row.original;
        return (
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{title}</span>
            <span className="text-xs text-gray-500 truncate max-w-xs">
              {description}
            </span>
          </div>
        );
      },
    },

    {
      accessorKey: "client_id",
      header: "Client",
      cell: ({ row }: any) => (
        <span className="text-gray-700">{row.original.client_id || "N/A"}</span>
      ),
    },

    {
      accessorKey: "media_sources",
      header: "Media Sources",
      cell: ({ row }: any) => (
        <span className="flex justify-center items-center">
          {row.original.media_sources.length}
        </span>
      ),
    },

    // {
    //   accessorKey: "thematic_areas",
    //   header: "Thematic Areas",
    //   cell: ({ row }) => (
    //     <span className="flex justify-center items-center">
    //       {row.original.thematic_areas.length}
    //     </span>
    //   ),
    // },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => <StatusBadge status={row.original.status} />,
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => {
        const project = row.original;

        return (
          <div className="flex items-center gap-3">
            <TbEye
              size={18}
              className="cursor-pointer text-blue-600 hover:text-blue-800"
              onClick={() => navigate(`/projects/${project.id}`)}
            />

            <TbPencil
              size={18}
              className="cursor-pointer text-green-600 hover:text-green-800"
              onClick={() => navigate(`/projects/${project.id}/edit`)}
            />

            <TbTrash
              size={18}
              className="cursor-pointer text-red-600 hover:text-red-800"
              onClick={() => handleDelete(project)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Projects</h2>
          <Button onClick={() => navigate("/projects/create")}>
            <TbPlus className="mr-2" /> Add New Project
          </Button>
        </div>

        <div className="flex gap-3 max-w-md">
          <Input
            placeholder="Search name..."
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value);
              if (e.target.value.trim() === "") {
                setNameFilter("");
                setPage(1);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                applySearch();
              }
            }}
          />

          <Button variant="secondary" onClick={applySearch}>
            <TbSearch className="mr-2" /> Search
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={fields}
          isLoading={isLoading}
          page={page}
          pageSize={10}
          total={data?.count ?? 0}
          onPageChange={(p) => setPage(p)}
        />
      </Card>
    </>
  );
}
