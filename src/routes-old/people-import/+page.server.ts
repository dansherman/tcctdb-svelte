import type { Actions } from './$types';
import { newPerson } from '$lib/import';
import { parse } from 'yaml'


export const actions = {
  create: async ({ cookies, request }) => {
    const data = await request.formData();
    const yamlText = data.get('yamlText');
    const people = parse(yamlText.toString())
    for (let person of people.people) {
      let id = await newPerson(person)
      console.log(id)
    }

    return { success: true };
  },

} satisfies Actions;