import { supabase } from "$lib/supabase";
export const load = async ({ params }) => {
  const { slug } = params;
  const { data: person } = await supabase
    .from('people')
    .select(`*,cast(character(*),production(*,show(title))),crew(production(*,show(title)),job(*))`)
    .eq('slug',slug)
    .single()
		//TODO: group productions
	return {person}
}
