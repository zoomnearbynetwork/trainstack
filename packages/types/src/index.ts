export type UserRole =
  | 'SUPER_ADMIN'
  | 'INSTITUTE_ADMIN'
  | 'COUNSELOR'
  | 'TRAINER'
  | 'MARKETING_MANAGER'
  | 'STUDENT';

export interface DashboardKpi {
  label: string;
  value: number | string;
}

export interface LeadDto {
  id: string;
  fullName: string;
  email?: string | null;
  phone?: string | null;
  status: string;
  score: number;
}

export interface ApiUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  tenantId: string;
}
