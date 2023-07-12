import { supabase } from "$lib/supabase";
export const prerender = false;

  export const load = async ({ params}) => {
    const { slug } = params;

    const { data: company } = await supabase
      .from('company')
      .select('*')
      .eq('slug',slug)
      .single()
    const { data: productions } = await supabase
      .from('productions')
      .select(`id, poster, slug, show(title,slug), company(name,slug), description, year`)
      .eq('company',slug)
  
    if (productions) {
      return { company, productions };
    }
}