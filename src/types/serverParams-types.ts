export type serverParams = {
  hostName: string;
  password: string;
  confirmPassword: string;
  username?: string;
  sshPort?: string;
  ErpNextPort?: string;
  cloudPlatform: string;
};

export type ErrorResponse = {
  hostname?: string;
  username?: string;
  password?: string;
  erpnext_port?: number;
};
