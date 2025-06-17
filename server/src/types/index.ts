// User interface for type checking
export interface IUserSchema extends Document {
  displayname: string;
  email: string;
  password: string | null;
  isVerified: boolean;
  token?: string | null;
  role: "customer" | "admin";
  createdAt: Date;
  updatedAt: Date;

  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  getAccessToken(): string | null;
  getRefreshToken(): string | null;
}
