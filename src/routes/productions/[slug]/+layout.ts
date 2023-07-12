import { supabase } from "$lib/supabase";
import type { Assignment, Role } from "$lib/types.js";
export const load = async ({ params }) => {
  const { slug } = params;
  const { data: production } = await supabase
    .from('productions')
    .select(`*,show(*),company(*),cast(character_photo,character(*),person(*)),crew(crew_photo,person(*),job(*))`)
    .eq('slug',slug)
    .single()
  const { data: photos } = await supabase
    .from('productionPhotos')
    .select(`cf_id, id, caption, photoRelationships(id,cast(character(character_name),person(name_last,name_first,slug)),crew(job(job_name),person(name_last,name_first,slug)),person(name_first,name_last,slug))`)
    .eq('production',slug)
  let groupedCrew = {}
  for (let assignment of production.crew) {
    if (!(assignment.job.id in groupedCrew)) {
      groupedCrew[assignment.job.id] = {job:assignment.job, people:[]}
    }
    if (assignment.person) {
    assignment.person['crew_photo'] = assignment?.crew_photo
  }
    groupedCrew[assignment.job.id].people.push(assignment.person)
  }
  let sortedCrew = Object.values(groupedCrew).sort((a:Assignment,b:Assignment)=>{return (a.job.sort_order - b.job.sort_order)})
  let groupedCast = {}
  for (let role of production.cast) {
    if (!(role.character.id in groupedCast)) {
      groupedCast[role.character.id] = {character:role.character, people:[]}
    }
    if (role.person) {
      role.person.character_photo = role.character_photo
      groupedCast[role.character.id].people.push(role.person)
    }
  }
  let sortedCast = Object.values(groupedCast).sort((a:Role,b:Role)=>{return (a.character.sort_order - b.character.sort_order)})
  production.cast = sortedCast
  production.crew = sortedCrew
  return { production, photos }
}