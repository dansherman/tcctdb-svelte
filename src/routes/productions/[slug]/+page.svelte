<script lang="ts">
  import PersonChip from "$components/PersonChip.svelte";
  import Title from "$components/Title.svelte";
  import SubTitle from "$components/SubTitle.svelte";
  import Section from "$components/Section.svelte";
  export let data;
  let { crew, cast, production } = data;
  let show = production.show;
</script>

<svelte:head>
  <title>{show.title}</title>
</svelte:head>
<Title>{show.title}</Title>
<SubTitle>
  <a href="/companies/{production.company.slug.current}"
    >{production.company.name}</a
  >
</SubTitle>
<Section>Cast</Section>
<ul class="list">
  {#each cast as role}
    <li class="mb-1">
      <div class="flex flex-wrap pt-2">
        <div class="basis-full md:basis-1/3"><span class="text-lg font-semibold tracking-wide">{role.characterName}</span></div>
      {#each role.people as person}
        <div><PersonChip {person} /></div>
      {/each}
      </div>
    </li>
  {/each}
</ul>

<Section>Crew</Section>
<ul class="list">
  {#each crew as job}
    <li class="mb-1">
      <div class="flex flex-wrap pt-2">
      <div class="basis-full md:basis-1/3"><span class="text-lg font-semibold tracking-wide">{job.jobName}</span></div>
      {#each job.people as person}
        <div><PersonChip {person} /></div>
      {/each}
      </div>
    </li>
  {/each}
</ul>
