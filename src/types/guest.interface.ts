export interface GuestInterface {
  id: number;
  email: string;
  fullName: string;
  created_at: string;
  nationalID: string;
  countryFlag: string;
  nationality: string;
  country?: string;
}
