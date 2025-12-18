export interface ApiError {
  status?: number;         // HTTP o supabase
  code?: string;           // error code interno o supabase
  message: string;         // mensaje legible
  details?: unknown;           // opcional: más info
}
