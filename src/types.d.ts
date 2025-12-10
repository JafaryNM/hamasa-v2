// AUTH
export interface SignType {
  identifier: string;
  password: string;
}

// GENERIC DATATABLE
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

// USER ROLES
export type UserRole =
  | "super_admin"
  | "reviewer"
  | "data_clerk"
  | "org_admin"
  | "org_user";

// CLIENT
export interface Client {
  id?: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  name_of_organisation: string;
  country: string;
  sector: string;
  plain_password: string;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
}

// PAGINATION
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// PROJECT CATEGORY
export interface ProjectCategory {
  id: string;
  name: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
}

// MEDIA CATEGORY
export interface MediaCategory {
  id: string;
  name: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
}

// MEDIA RECORD
export interface MediaData {
  id: string;
  category_id: string;
  category_name: string;
  name: string;
  created_at: string;
  updated_at: string;
}

// PROJECT (MAIN OBJECT)
export interface ProjectType {
  id: string;
  title: string;
  description: string;
  client_id: string;
  client_name: string;
  total_media_sources: number;
  total_thematic_areas: number;

  categories: Category[];
  collaborators: Collaborator[];
  media_sources: MediaSource[];
  thematic_areas: ThematicArea[];
  report_avenues: ReportAvenue[];
  report_times: ReportTime[];
  report_consultations: ReportConsultation[];

  created_at?: string;
  updated_at?: string;
}

// SIMPLE CATEGORY REF
export interface Category {
  id?: string;
  name?: string;
}

// SIMPLE COLLABORATOR REF
export interface Collaborator {
  id?: string;
  name?: string;
}

// MEDIA SOURCE USED IN PROJECT
export interface MediaSource {
  id: string;
  name: string;
  category_name: string;
}

// THEMATIC AREA DETAILS
export interface ThematicArea {
  id: string;
  area: string;
  title: string;
  description: string;
  monitoring_objectives: string[];
}

// REPORT AVENUE
export interface ReportAvenue {
  id: string;
  name: string;
}

// REPORT TIME
export interface ReportTime {
  id: string;
  name: string;
}

// REPORT CONSULTATION METHOD
export interface ReportConsultation {
  id: string;
  name: string;
}

// PROJECT PROCESS
export interface ProjectProgress {
  id: string;
  stage_no: number;
  owner_id: string;
  previous_status: "draft" | "active" | "completed" | string;
  current_status: "draft" | "active" | "completed" | string;
  action: string;
  comment: string;
  created_at: string; // ISO date
}

// PROJECT REPORT AVENUE
export interface ProjectReportAvenueData {
  id: string;
  name: string;
}

// PROJECT REPORT TIME
export interface ProjectReportTimeData {
  id: string;
  name: string;
}
