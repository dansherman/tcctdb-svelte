<script>
  export let data;
  let { person } = data;
  import ProductionChip from "$components/ProductionChip.svelte";
  // import ProductionMiniCard from '$components/ProductionMiniCard.svelte'
</script>

<svelte:head>
  <title>{person.name}</title>
</svelte:head>

<h1 class="font-bold text-6xl py-4">{person.name}</h1>

{#if person.biography}
  <h3 class="font-bold text-4xl py-4">Biography</h3>
  <div class="mt-4 text-lg text-slate-800">
    {person.biography}
  </div>
{/if}
{#if person.roles?.length > 0}
  <div class="mt-4 text-lg text-slate-800">
    <h3 class="font-bold text-4xl py-4">Cast</h3>
    <ul class="list">
      {#each person.roles as role}
        <li class="mb-1">
          <ProductionChip production={role.production} />
          <span class="text-lg ml-2">{role.characterName}</span>
        </li>
      {/each}
    </ul>
  </div>
{/if}
{#if person.assignments?.length > 0}
  <div class="mt-4 text-lg text-slate-800">
    <h3 class="font-bold text-4xl py-4">Crew</h3>
    <ul class="list">
      {#each person.assignments as job}
        <li class="mb-1">
          <ProductionChip production={job.production} />
          <span class="text-lg ml-2">{job.jobName}</span>
        </li>
      {/each}
    </ul>
  </div>
{/if}
