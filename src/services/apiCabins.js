import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error, "Cabins cant be loaded");
    throw new Error("Cabins cant be loaded");
  }
  return data;
}

export async function deleteCabinApi(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error, "Cabin cant be deleted");
    throw new Error("Cabin cant be deleted");
  }
  return data;
}

export async function createEditCabin(cabinData, id) {
  console.log(cabinData.image, "cabinData.image");
  const hasImagePath = cabinData.image?.startsWith?.(`${supabaseUrl}`);
  const imageName = `${Math.random()}-${cabinData.image?.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = hasImagePath
    ? cabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // 1. create cabin
  let query = supabase.from("cabins");
  // A. Create
  if (!id) {
    query = query
      .insert([{ ...cabinData, image: imagePath }])
      .select()
      .single();
  }
  // B. Edit
  else {
    query = query
      .update({ ...cabinData, image: imagePath })
      .eq("id", id)
      .select()
      .single();
  }
  const { data, error } = await query;
  if (error) {
    console.log(error, "Cabin cant be created");
    throw new Error("Cabin cant be created");
  }

  // 2. upload image only when a new file was selected
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabinData.image);
    // 3. Delete the cabin if the image upload fails
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.log(storageError);
      throw new Error("Cabin image cant be uploaded and cabin was not created");
    }
  }
  return data;
}
