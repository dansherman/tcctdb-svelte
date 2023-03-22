import dayjs from "dayjs";
import updateClient from "$lib/sanityUpdateClient.js";
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
/** @type {import('./$types').Actions} */

export const actions = {
  addRole: async ({ cookies, request }) => {
    const data = await request.formData();
    const characterRef = data.get("characterRef");
    const personRef = data.get("personRef");
    const productionRef = data.get("productionRef");
    await updateClient
      .create({
        _type: "role",
        character: {
          _type: "ref",
          _ref: characterRef,
        },
        person: {
          _type: "ref",
          _ref: personRef,
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
  },
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
  const peopleQuery = `*[_type == 'person' && !(_id in path("drafts.**")) && (isLocal || isLocal == null)]|order(nameFirst)|order(nameLast){"name":nameFirst + " " + nameLast,_id}`;
  const production = await updateClient.fetch(productionQuery, { slug: slug });
  const people = await updateClient.fetch(peopleQuery, { id: production._id });
  if (production.performanceDates) {
    production.parsedPerformanceDates = production.performanceDates.map(
      (pd) => {
        let d = new Date(pd.dateAndTime);
        return {
          dateAndTime: dayjs(d).format("MMM D, YYYY h:mma"),
          venue: pd.venue,
        };
      }
    );
  }
  return { people, production, };
}