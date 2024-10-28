import {
  HiBanknotes,
  HiChartBar,
  HiOutlineBriefcase,
  HiOutlineCalendar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { BookingInterface } from "../../types/booking.interface";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinsCount,
}: {
  bookings: {
    created_at: BookingInterface["created_at"];
    extraPrice: BookingInterface["extraPrice"];
    totalPrice: BookingInterface["totalPrice"];
  }[];
  confirmedStays: BookingInterface[];
  numDays: number;
  cabinsCount: number;
}) {
  const totalBookings = bookings.length;

  const totalSales = confirmedStays.reduce(
    (acc, cur) => acc + cur.totalPrice,
    0
  );

  const checkIns = confirmedStays.filter(
    (booking) => booking.status === "checked-in"
  );

  const occupancyRate =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (cabinsCount * numDays);

  return (
    <>
      <Stat
        color="blue"
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={totalBookings}
      />
      <Stat
        color="green"
        icon={<HiBanknotes />}
        title="total sales"
        value={formatCurrency(totalSales)}
      />
      <Stat
        color="indigo"
        icon={<HiOutlineCalendar />}
        title="check ins"
        value={checkIns.length}
      />
      <Stat
        color="yellow"
        icon={<HiChartBar />}
        title="occupancy rate"
        value={Math.round(occupancyRate * 100) + "%"}
      />
    </>
  );
}
