<script lang="ts">
	export let data;
	let crew = data.crew;
	let cast = data.cast;
	let production = data.production;
	let show = production.show;
</script>

<svelte:head>
	<title>{show.title}</title>
</svelte:head>
<h1>{show.title}</h1>
<h2>{production.company.name}</h2>
  <h3 class="font-bold text-4xl py-4">Cast</h3>
  <ul class="list">
  {#each cast as role}
    <li>
      <span class="font-bold">{role.characterName}</span>
      <span class="">{role.personName}</span>
    </li>
  {/each}
  </ul>


  <h3 class="font-bold text-4xl py-4">Crew</h3>
{#each crew as job}
<span class="font-bold">{job.characterName}</span>
<span class="">{job.personName}</span>
{/each}

