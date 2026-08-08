import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      // invalidate all queries that are active on the current page, so that the data is refetched and updated
      // and we dont have to remember the query keys
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => {
      toast.error(`Booking could not be checked out: ${error.message}`);
    },
  });
  return { checkout, isCheckingOut };
}
