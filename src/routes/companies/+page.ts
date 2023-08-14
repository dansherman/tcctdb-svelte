import { supabase } from "$lib/supabase";
export const load = async () => {
  const { data: companies } = await supabase
    .from('companies')
    .select(`name,slug.current`)
  return { companies }
}
