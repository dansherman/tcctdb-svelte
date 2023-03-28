<script>
  export let data;
  let { person } = data;
  import ProductionChip from "$components/ProductionChip.svelte";
  import Title from "$components/Title.svelte";
  import Section from "$components/Section.svelte";
</script>

<svelte:head>
  <title>{person.name}</title>
</svelte:head>

<Title>{person.name}</Title>

{#if person.biography}
<div class="mt-4 text-lg text-slate-800">
  <Section>Biography</Section>
    {person.biography}
  </div>
{/if}
{#if person.roles?.length > 0}
  <div class="mt-4 text-lg text-slate-800">
    <Section>Cast</Section>
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
    <Section>Crew</Section>
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
