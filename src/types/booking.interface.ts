import { CabinInterface } from "./cabin.interface";
import { GuestInterface } from "./guest.interface";

export interface BookingInterface {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extraPrice: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: null;
  cabinId: number;
  guestId: number;
  cabins: CabinInterface;
  guests: GuestInterface;
}
