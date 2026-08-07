import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      // invalidate all queries that are active on the current page, so that the data is refetched and updated
      // and we dont have to remember the query keys
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (error) => {
      toast.error(`Booking could not be checked in: ${error.message}`);
    },
  });
  return { checkin, isCheckingIn };
}
