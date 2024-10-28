import styled from "styled-components";
import { useRecentBookings } from "./useGetRecentBookings";
import { useRecentStays } from "./useGetRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { BookingInterface } from "../../types/booking.interface";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import Today from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { isLoading: isLoading1, bookings } = useRecentBookings();
  const { isLoading: isLoading2, confirmedStays, numDays } = useRecentStays();
  const { isLoading: isLoading3, cabins } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;
  console.log(confirmedStays);
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings as BookingInterface[]}
        confirmedStays={confirmedStays as BookingInterface[]}
        numDays={numDays}
        cabinsCount={cabins?.length as number}
      />
      <Today />
      <DurationChart stays={confirmedStays as BookingInterface[]} />
      <SalesChart bookings={bookings as BookingInterface[]} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
