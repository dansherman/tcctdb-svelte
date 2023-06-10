import { supabase } from "$lib/supabase";
export const load = async () => {
  const { data: productions } = await supabase
    .from('productions')
    .select(`show(title), poster, company(name), slug`)
  return { productions }
}
