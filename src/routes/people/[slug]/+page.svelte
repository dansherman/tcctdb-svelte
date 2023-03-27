<script> 
  export let data;
  let {person} = data;

  import Headshot from '$components/Headshot.svelte';
  import ProductionChip from '$components/ProductionChip.svelte';
  // import ProductionMiniCard from '$components/ProductionMiniCard.svelte'
</script>
<svelte:head>
  <title>{person.name}</title>
</svelte:head>

<h1 class="font-bold text-6xl py-4">{ person.name }</h1>

<Headshot person={ person } width=512 height=512/>




{#if person.biography}
            <h2 class="text-xl font-medium text-slate-800">Biography</h2>
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
      <ProductionChip production={role.production}/>
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
      <span class="text-lg ml-2">{job.jobName}</span>
      {#each job.people as person}
      <ProductionChip production={job.production}/>
      {/each}
    </li>
    {/each}
    </ul>
</div>
{/if}