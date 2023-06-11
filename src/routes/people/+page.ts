import { supabase } from "$lib/supabase";
export const load = async () => {
  const { data: people } = await supabase
    .from('people')
    .select(`*,role_count:cast(count),job_count:crew(count)`)
  return { people }
}
