export interface Staff {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  branchId?: string;
  role: 'cashier' | 'clerk';
  isActive?: boolean;
}
