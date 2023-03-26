import updateClient from "$lib/sanityUpdateClient.js";
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
/** @type {import('./$types').Actions} */

export const actions = {
  assignRole: async ({ request }) => {
    const data = await request.formData();
    const roleRef = data.get("roleRef");
    const personRef = data.get("personRef");
    let result = await updateClient
      .patch(roleRef.toString())
      .setIfMissing({people: []})
      .append('people', [{_ref:personRef.toString(), _type:'ref'}])
      .commit()
      .then((res) => {
        console.log(res)
        return JSON.stringify(res);
      })
      .catch((err) => {
        console.log(err.message)
        return err.message;
      });
    return result
  },
  unAssignRole: async ({ request }) => {
    const data = await request.formData();
    const roleRef = data.get("roleRef");
    const index = data.get("index");
    let result = await updateClient
      .patch(roleRef.toString())
      .unset([`people[${index}]`])
      .commit()
      .then((res) => {
        return JSON.stringify(res);
      })
      .catch((err) => {
        return err.message;
      });
    return result
  },
  addMissingCharacters: async ({ request }) => {
    const data = await request.formData();
    const showRef = data.get("showRef");
    const productionRef = data.get("productionRef");
    const productionCharacterQuery = `*[_type == 'role' && !(_id in path("drafts.**")) && production._ref == $productionID]|order(sortOrder){character}`
    const characterQuery = `*[_type == 'character' && !(_id in path("drafts.**")) && show._ref == $showID]|order(sortOrder){_id}`
    const allCharacters = await updateClient.fetch(characterQuery, {showID: showRef})
    const productionCharacters = await updateClient.fetch(productionCharacterQuery, {productionID: productionRef})
    let existingCharacters = productionCharacters.map((x)=>{return x.character._ref})
    for (let character of allCharacters) {
      if (!existingCharacters.includes(character._id)) {
        await updateClient
          .create({
            _type: "role",
            character: {
              _type: "ref",
              _ref: character._id,
            },
            production: {
              _type: "ref",
              _ref: productionRef,
            },
          })
          .then((res) => {
            return JSON.stringify(res);
          })
          .catch((err) => {
            return fail(500, err.message);
          });
          }
    }
    return
  },
  // deleteDocs: async () => {
  //   const deleteQuery = `*[_type == 'role' && !(_id in path('drafts.**')) && production._ref == '01006f1b-5a48-4492-803e-471223a778bb' && _createdAt >= '2023-03-21']`
  //   let result = await updateClient.delete({query:deleteQuery})
  //   console.log(result)
  //   return
  // }
};
export const load:PageServerLoad = async ({ params }) => {
  const { slug } = params;
  const productionQuery = `*[_type == 'production' && slug.current == $slug][0]{ 
    _id,
    description,
    poster,
    performanceDates[]{dateAndTime,venue->{name}},
    show->,
    company->{name,logo},
    slug
  }`;
  const production = await updateClient.fetch(productionQuery, { slug: slug });
  const peopleQuery = `*[_type == 'person' && !(_id in path("drafts.**")) && (isLocal || isLocal == null)]|order(nameFirst)|order(nameLast){"name":nameFirst + " " + nameLast,nameFirst, nameLast, _id, slug, vocalRange}`;
  const people = await updateClient.fetch(peopleQuery, { id: production._id });
  return { people, production, };
}