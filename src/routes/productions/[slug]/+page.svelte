<script lang="ts">
	export let data;
	let { crew, cast, production } = data;
	let show = production.show;
  console.log(crew)
</script>

<svelte:head>
	<title>{show.title}</title>
</svelte:head>
<h1 class="font-bold text-6xl py-4">{show.title}</h1>
<h2 class="font-bold text-5xl py-4">{production.company.name}</h2>
<h3 class="font-bold text-4xl py-4">Cast</h3>
<ul class="list">
{#each cast as role}
<li class="mb-1">
  <span class="text-lg">{role.characterName}</span>
  {#each role.people as person}
    <span class="px-1 text-lg font-medium border-b-sky-500 border rounded-sm hover:bg-sky-200 hover:shadow-md">
      <a href="/people/{person.slug.current}">{person.name}</a>
    </span>
  {/each}
</li>
{/each}
</ul>

<h3 class="font-bold text-4xl py-4">Crew</h3>
<ul class="list">
{#each crew as job}
<li class="mb-1">
  <span class="text-lg">{job.jobName}</span>
  {#each job.people as person}
    <span class="px-1 text-lg font-medium border-b-sky-500 border rounded-sm hover:bg-sky-200 hover:shadow-md">
      <a href="/people/{person.slug.current}">{person.name}</a>
    </span>
  {/each}
</li>
{/each}
</ul>
