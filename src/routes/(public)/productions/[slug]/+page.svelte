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
<li>
  <span class="font-bold">{role.characterName}</span>
  {#each role.people as person}
    <span class="pr-2">
      <a href="/people/{person.slug.current}">{person.name}</a>
    </span>
  {/each}
</li>
{/each}
</ul>

<h3 class="font-bold text-4xl py-4">Crew</h3>
<ul class="list">
{#each crew as job}
<li>
  <span class="font-bold">{job.jobName}</span>
  {#each job.people as person}
    <span class="pr-2">
      <a href="/people/{person.slug.current}">{person.name}</a>
    </span>
  {/each}
</li>
{/each}
</ul>
