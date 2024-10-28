import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking as updateBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useCheckout() {
  const params = useParams();
  const queryClient = useQueryClient();

  const bookingId = params.bookingId;

  const { isLoading: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: ({ id }: { id: number }) =>
      updateBookingApi(id, { status: "checked-out" }),
    onSuccess: () => {
      queryClient.invalidateQueries(["bookings"]);
      queryClient.invalidateQueries([bookingId]);
      queryClient.invalidateQueries(["stays"]);
      toast.success("booking has been checked out successfully");
    },

    onError: () => {
      toast.error("cannot checkout the booking");
    },
  });

  return { isCheckingOut, checkout };
}
