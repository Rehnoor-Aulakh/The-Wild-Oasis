import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error, "Cabins cant be loaded");
    throw new Error("Cabins cant be loaded");
  }
  return data;
}
