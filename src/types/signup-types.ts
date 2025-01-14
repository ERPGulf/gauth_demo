export interface SignFormValues {
  fullname: string;
  id: number;
  email: string;
  mobile: number;
  password: string;
  confirm_password: string;
  customer_company: string;
  terms?: boolean;
}

export interface ValidateEmailResponse {
  blocked: boolean;
  reason: string;
}
