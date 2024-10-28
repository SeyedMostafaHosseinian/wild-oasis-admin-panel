import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../constants/items-per-page";
import { BookingInterface } from "../../types/booking.interface";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filterStatus = searchParams.get("status");
  const sortParam = searchParams.get("sortBy") || "startDate-desc";
  const [sortFieldName, sortDirection] = sortParam?.split("-") as [
    string,
    "asc" | "desc"
  ];
  const pageParam = searchParams.get("page") || 1;

  // Query
  const { isLoading, data: { data: bookings, count } = {} } = useQuery<{
    data: BookingInterface[];
    count: number | null;
  }>({
    queryKey: ["bookings", filterStatus, sortParam && sortParam, +pageParam],
    queryFn: () =>
      getAllBookings({
        order: {
          fieldName: sortFieldName,
          direction: sortDirection,
        },
        filter: {
          fieldName: "status",
          value:
            filterStatus === "all" || !filterStatus
              ? null
              : (filterStatus as string),
        },
        page: +pageParam,
      }),
  });
  const lastPage = (count as number) / ITEMS_PER_PAGE;

  const queryClient = useQueryClient();
  if (+pageParam < lastPage) {
    queryClient.prefetchQuery({
      queryKey: [
        "bookings",
        filterStatus,
        sortParam && sortParam,
        +pageParam + 1,
      ],
      queryFn: () =>
        getAllBookings({
          order: {
            fieldName: sortFieldName,
            direction: sortDirection,
          },
          filter: {
            fieldName: "status",
            value:
              filterStatus === "all" || !filterStatus
                ? null
                : (filterStatus as string),
          },
          page: +pageParam + 1,
        }),
    });
  }

  if (+pageParam > 1) {
    queryClient.prefetchQuery({
      queryKey: [
        "bookings",
        filterStatus,
        sortParam && sortParam,
        +pageParam - 1,
      ],
      queryFn: () =>
        getAllBookings({
          order: {
            fieldName: sortFieldName,
            direction: sortDirection,
          },
          filter: {
            fieldName: "status",
            value:
              filterStatus === "all" || !filterStatus
                ? null
                : (filterStatus as string),
          },
          page: +pageParam - 1,
        }),
    });
  }

  return { isLoading, bookings, count };
}
