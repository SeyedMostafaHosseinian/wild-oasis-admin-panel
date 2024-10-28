import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking as updateBookingApi } from "../../services/apiBookings";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export function useCheckin() {
  const params = useParams();
  const bookingId = params.bookingId;
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: checkin } = useMutation({
    mutationFn: ({
      id,
      breakfast,
    }: {
      id: number;
      breakfast: null | {
        extraPrice: number;
        totalPrice: number;
        hasBreakfast: boolean;
      };
    }) =>
      updateBookingApi(id, {
        status: "checked-in",
        isPaid: true,
        ...(breakfast && breakfast),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries([bookingId]);
      queryClient.invalidateQueries(["bookings"]);
      queryClient.invalidateQueries(["stays"]);
      toast.success("booking has been checked in successfully");
    },

    onError: () => {
      toast.error("cannot checked in the booking");
    },
  });

  return { isUpdating, checkin };
}
