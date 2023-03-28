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
      <span class="text-lg">{role.characterName}</span>
      {#each role.people as person}
        <PersonChip {person} />
      {/each}
    </li>
  {/each}
</ul>

<Section>Crew</Section>
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
