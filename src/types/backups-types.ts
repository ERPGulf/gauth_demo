export interface BackupItem {
  display_name: string;
  lifecycle_state: string;
  size_in_gbs: number;
  time_created: string;
}

export interface BackupResponse {
  data: BackupItem[];
}
