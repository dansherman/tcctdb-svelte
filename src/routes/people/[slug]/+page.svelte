<script>
  export let data;
  let { person } = data;
  import ProductionChip from "$components/ProductionChip.svelte";
  import Title from "$components/Title.svelte";
  import Section from "$components/Section.svelte";
  import Headshot from "$components/Headshot.svelte";
  console.log(person.resumeUrl)
</script>

<svelte:head>
  <title>{person.name}</title>
</svelte:head>

<Title>{person.name}</Title>
<div class="w-96 mt-6">
<Headshot {person}/>
</div>
{#if person.biography}
<div class="mt-4 text-lg text-slate-800 max-w-xl">
  <Section>Biography</Section>
    {person.biography}
  </div>
{/if}
{#if person.resumeUrl}
<div class="text-lg text-blue-800">
<a href="{person.resumeUrl}?dl=">Download Resume <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 inline">
  <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
  <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
</svg>
</a>
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
