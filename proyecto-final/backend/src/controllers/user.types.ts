export interface UserAttributes {
  id: number;
  UUID: string;
  username: string;
  email: string;
  clave: string;
  role: string;

  confirmation_token: string;
  confirmation_ok: boolean;

  deleted?: boolean;
  deleted_at?: Date | null;

  createdAt?: Date;
  updatedAt?: Date;
}
