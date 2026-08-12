import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}) {
  // 1. Number of bookings
  const numBookings = bookings?.length;

  // 2.
  const sales = bookings?.reduce((acc, curr) => acc + curr.totalPrice, 0);

  // 3. Number of check ins
  const checkIns = confirmedStays?.length;

  // 4. Occupancy rate
  // Num of nights checked in / total number of nights available (no of days * no of cabins available)
  const occupation = (confirmedStays ?? []).reduce(
    (acc, curr) => acc + curr.numNights,
    0,
  );
  const totalAvailableNights = Number(numDays) * Number(cabinCount);
  const occupancyRate =
    totalAvailableNights > 0 ? occupation / totalAvailableNights : 0;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancyRate * 100)+"%"}
      />
    </>
  );
}
