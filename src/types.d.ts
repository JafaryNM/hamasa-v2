export interface SignType {
  identifier: string;
  password: string;
}
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;

  page: number;
  pageSize: number;
  total: number;

  onPageChange: (page: number) => void;
}

export type UserRole =
  | "super_admin"
  | "reviewer"
  | "data_clerk"
  | "org_admin"
  | "org_user";

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

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ProjectCategory {
  id: string;
  name: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
}
