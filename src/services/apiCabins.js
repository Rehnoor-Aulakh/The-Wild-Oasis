import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error, "Cabins cant be loaded");
    throw new Error("Cabins cant be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error, "Cabin cant be deleted");
    throw new Error("Cabin cant be deleted");
  }
  return data;
}

export async function createCabin(cabinData) {
  // https://tlnuvqttkbtblniojbax.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${Math.random()}-${cabinData.image.name}`.replaceAll(
    "/",
    "",
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert({ ...cabinData, image: imagePath })
    .select();

  if (error) {
    console.log(error);
    throw new Error("Cabin cant be created");
  }
  // 2. upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabinData.image);
  // 3. Delete the cabin if the image upload fails
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error("Cabin image cant be uploaded and cabin was not created");
  }
  return data;
}
