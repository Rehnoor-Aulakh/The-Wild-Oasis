import { useQuery } from "@tanstack/react-query";

import { getCabins } from "../../services/apiCabins";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export default function useBooking() {
  // bookingId is defined in the react router's param and not search param
  const { bookingId } = useParams();
  const { isLoading, data: booking } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false, // if the booking is not found, we don't want to retry
  });
  return { isLoading, booking };
}
