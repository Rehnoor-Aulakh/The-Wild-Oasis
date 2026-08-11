import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      return loginApi({ email, password });
    },
    onSuccess: (user) => {
      console.log(user);
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Provided email or password is incorrect. Please try again.");
    },
  });
  return { login, isLoading };
}
