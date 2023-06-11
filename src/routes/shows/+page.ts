import { supabase } from "$lib/supabase";
export const load = async () => {
  const { data: shows } = await supabase
    .from('shows')
    .select(`*`)
  return { shows }
}
