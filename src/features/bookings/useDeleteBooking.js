import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteBookingService, isLoading: isDeleting } =
    useMutation({
      mutationFn: deleteBooking,
      onSuccess: () => {
        toast.success(`Booking successfully deleted`);
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
      },
      onError: (error) => {
        toast.error(`Booking could not be deleted: ${error.message}`);
      },
    });
  return { deleteBookingService, isDeleting };
}
