import { supabase } from "$lib/supabase";
import { nanoid } from "nanoid";
import { selectedId } from "./stores";

export const uploadPhoto = async (e) => {
  const {acceptedFiles, fileRejections } = e.detail
  try {
    if (!acceptedFiles || acceptedFiles.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    const file = acceptedFiles[0];
    const fileExt = file.name.split(".").pop();
    const filename = `${nanoid()}.${fileExt}`;

    let { error } = await supabase.storage
      .from("productionPhotos")
      .upload(filename, file);
    if (error) {
      console.log("could not upload");
      throw error;
    }
    let assignment = await supabase
      .from("cast")
      .update({ character_photo: filename })
      .eq("id", selectedId);
      return filename
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
};
export const photoUrl = (url) => {
  return `https://gjnfygrrxeyxxqgezevn.supabase.co/storage/v1/object/public/productionPhotos/${url}`
}