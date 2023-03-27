<script lang="ts">
  import PersonChip from "$components/PersonChip.svelte";
  export let data;
  let { crew, cast, production } = data;
  let show = production.show;
</script>

<svelte:head>
  <title>{show.title}</title>
</svelte:head>
<h1 class="font-bold text-6xl py-4">{show.title}</h1>
<h2 class="font-bold text-5xl py-4">
  <a href="/companies/{production.company.slug.current}"
    >{production.company.name}</a
  >
</h2>
<h3 class="font-bold text-4xl py-4">Cast</h3>
<ul class="list">
  {#each cast as role}
    <li class="mb-1">
      <span class="text-lg">{role.characterName}</span>
      {#each role.people as person}
        <PersonChip {person} />
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
        <PersonChip {person} />
      {/each}
    </li>
  {/each}
</ul>
