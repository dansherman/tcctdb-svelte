const links = {
  SoM1: "https://f001.backblazeb2.com/file/4ct-seussical/Sound%20of%20Music%20-%20Closing%20Night%20-%20Act%201.mp4",
  SoM2: "https://f001.backblazeb2.com/file/4ct-seussical/Sound%20of%20Music%20-%20Closing%20Night%20-%20Act%202.mp4"
}

export async function GET({ params }) {
	const { slug } = params;
  if (slug in Object.keys(links)) {
    return {headers: {Location:links[slug]},status: 301}
  } else {
    return {status: 404}
  }
}