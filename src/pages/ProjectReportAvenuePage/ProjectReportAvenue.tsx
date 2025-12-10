import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { Input } from "../../components/ui/input";
import { TbPencil, TbPlus, TbSearch, TbTrash } from "react-icons/tb";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Card } from "../../components/ui/card";
import { DataTable } from "../../components/common/Datatable";
import { ProjectReportAvenueData } from "../../types";

import {
  ProjectCategorySchema,
  ProjectCategoryType,
} from "../../Schema/ProjectCategorySchema";
import {
  useAddProjectReportAvenue,
  useDeleteProjectReportAvenue,
  useProjectReportAvenues,
  useUpdateProjectReportAvenue,
} from "../../hooks/useProjectReportAvenue";
import { ProjectReportAvenueType } from "../../Schema/ProjectReportAvenueSchema";

export default function ProjectReportAvenue() {
  const [page, setPage] = useState(1);
  const [nameInput, setNameInput] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const { data, isLoading } = useProjectReportAvenues({
    page,
    page_size: 10,
    name: nameFilter || null,
    country: null,
    sort: "desc",
  });

  const addProjectReportAvenue = useAddProjectReportAvenue();
  const updateProjectReportAvenue = useUpdateProjectReportAvenue();
  const deleteProjectReportAvenue = useDeleteProjectReportAvenue();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] =
    useState<ProjectReportAvenueData | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] =
    useState<ProjectReportAvenueData | null>(null);

  const form = useForm<ProjectCategoryType>({
    resolver: zodResolver(ProjectCategorySchema),
    defaultValues: { name: "", description: "" },
  });

  const { handleSubmit, control, reset } = form;

  const fields =
    data?.results?.map((fields: ProjectReportAvenueData, index: number) => ({
      ...fields,
      sn: index + 1 + (page - 1) * 10,
    })) || [];

  const applySearch = () => {
    setNameFilter(nameInput);
    setPage(1);
  };

  const openCreateModal = () => {
    reset({ name: "", description: "" });
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const openEditModal = (record: ProjectReportAvenueData) => {
    reset({ name: record.name || "" });
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  const confirmDelete = (record: ProjectReportAvenueData) => {
    setRecordToDelete(record);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!recordToDelete?.id) return;

    deleteProjectReportAvenue.mutate(recordToDelete.id, {
      onSuccess: () => {
        toast.success("Project report avenue deleted successfully");
        setIsDeleteOpen(false);
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.detail ||
            "Failed to delete project report avenue category"
        );
      },
    });
  };

  const onSubmit = (values: ProjectReportAvenueType) => {
    if (editingRecord) {
      updateProjectReportAvenue.mutate(
        { id: editingRecord.id!, data: values },
        {
          onSuccess: () => {
            toast.success("Project report avenue updated successfully");
            setIsModalOpen(false);
          },
          onError: (err: any) =>
            toast.error(
              err?.response?.data?.detail ||
                "Failed to update project report avenue"
            ),
        }
      );
    } else {
      addProjectReportAvenue.mutate(values, {
        onSuccess: () => {
          toast.success("Project category created successfully");
          setIsModalOpen(false);
        },
        onError: (err: any) =>
          toast.error(
            err?.response?.data?.detail || "Failed to create project category"
          ),
      });
    }
  };

  const columns = [
    { accessorKey: "sn", header: "S/N" },
    { accessorKey: "name", header: "Name" },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => {
        const record = row.original;

        return (
          <div className="flex gap-3">
            <TbPencil
              className="cursor-pointer text-blue-500"
              onClick={() => openEditModal(record)}
            />
            <TbTrash
              className="cursor-pointer text-red-500"
              onClick={() => confirmDelete(record)}
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
          <h2 className="text-xl font-semibold">All Project Report Avenues</h2>
          <Button onClick={openCreateModal}>
            <TbPlus className="mr-2" /> Add Project Report Avenue
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

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-lg max-h-[75vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingRecord
                  ? "Update Project Category"
                  : "Create Project Category"}
              </DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={
                      addProjectReportAvenue.isPending ||
                      updateProjectReportAvenue.isPending
                    }
                  >
                    {addProjectReportAvenue.isPending ||
                    updateProjectReportAvenue.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {editingRecord ? "Updating..." : "Creating..."}
                      </>
                    ) : editingRecord ? (
                      "Update"
                    ) : (
                      "Create"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>

            <p className="text-gray-600">
              Are you sure you want to delete{" "}
              <strong>{recordToDelete?.name}</strong>?
            </p>

            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => setIsDeleteOpen(false)}
                disabled={deleteProjectReportAvenue.isPending}
              >
                Cancel
              </Button>

              <Button
                variant="destructive"
                onClick={handleConfirmDelete}
                disabled={deleteProjectReportAvenue.isPending}
              >
                {deleteProjectReportAvenue.isPending ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
}
