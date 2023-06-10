
import { supabase } from "$lib/supabase";
export const getImageUrl = async (path: string) => {
  if (path) {
    try {
      const { data } = await supabase.storage
        .from("productionPhotos")
        .getPublicUrl(path);
      return data.publicUrl;
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message);
      }
    }
  } 
  return Promise.reject()
};