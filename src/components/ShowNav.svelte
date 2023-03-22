<script>
  export let slug = {}

  import { page } from "$app/stores"
	export let assignment = {}
	import Headshot from '$components/Headshot.svelte';
	$: displayAssignPersonDialog = false;
	const toggleAssignPerson = () => {
		displayAssignPersonDialog = !displayAssignPersonDialog;
	};
	const assignPerson = async (person) => {
		assignment.person = person
    displayAssignPersonDialog = false
	}
  const subpage = $page.url.pathname.replace(/\/$/, '').split('/')[-1]

  const activeTabStyle = "border-sky-500 text-sky-600";
  const defaultTabStyle =
    "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300";
</script>
<nav class="-mb-px flex space-x-8" aria-label="Tabs">
  <a
  href="/shows/{slug.current}"
  class="{subpage === slug.current
    ? activeTabStyle
    : defaultTabStyle} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-2xl;"
  aria-current="page"
>
  Main
</a>
  <a
    href="/shows/{slug.current}/cast"
    class="{subpage === 'cast'
      ? activeTabStyle
      : defaultTabStyle} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-2xl;"
    aria-current="page"
  >
    Cast
  </a>
  <a
    href="/shows/{slug.current}/crew"
    class="{subpage === 'crew'
      ? activeTabStyle
      : defaultTabStyle} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-2xl;"
    aria-current="page"
  >
    Crew
  </a>
</nav>