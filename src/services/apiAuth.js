import React from "react";
import supabase from "./supabase";
import toast from "react-hot-toast";
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    toast.error("Provided email or password is incorrect. Please try again.");
    throw new Error(error.message);
  }
  console.log(data);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}
