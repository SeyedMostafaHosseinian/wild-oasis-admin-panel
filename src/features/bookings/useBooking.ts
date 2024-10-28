import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";
import { BookingInterface } from "../../types/booking.interface";

export function useBooking() {
  const params = useParams();
  const bookingId = params.bookingId;
  const { isLoading, data: booking } = useQuery<BookingInterface>({
    queryFn: () => getBooking(bookingId as string),
    queryKey: [bookingId],
    retry: false,
  });

  return { isLoading, booking };
}
