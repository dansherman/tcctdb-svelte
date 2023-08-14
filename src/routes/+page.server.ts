import client from "$lib/sanityClient";
export async function load() {
  const query = `*[_type == 'production']|order(performanceDates[0].dateAndTime desc){
    slug,
    show->{title},
    poster,
    company->{name},
    'year':performanceDates[0].dateAndTime,
  }`;
  let productions = await client.fetch(query);
  productions = productions.map((p) => {
    if (p.year != null) {
      p.year = p.year.slice(0, 4);
    } else {
      p.year = "—";
    }
    return p;
  });
  return { productions };
}