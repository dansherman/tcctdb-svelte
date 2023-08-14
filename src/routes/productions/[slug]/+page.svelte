<script lang="ts">
  import Section from "$components/Section.svelte";
  import PersonChip from "$components/PersonChip.svelte";
  import { urlFor } from "$lib/imgUrl.js";

  export let data;
  let { cast, crew, production } = data;
  let featuredCast = cast.filter((x) => {
    return x.character.roleSize == "lead";
  });
</script>

<div class="my-4 max-w-xs md:max-w-full mx-auto">
  {#if production.header}
    <img
      class="w-full border-indigo-500 bg-indigo-500 border-2 inset-2 shadow-md h-72 rounded-md mb-3.5"
      src={urlFor(production.header).url()}
      alt="poster for {production.show.title} by {production.company.name}"
    />
  {:else if production.poster}
    <img
      class="w-md border-indigo-500 bg-indigo-500 border-2 inset-2 shadow-md rounded-md mb-3.5"
      src={urlFor(production.poster).url()}
      alt="poster for {production.show.title} by {production.company.name}"
    />
  {:else}
    <div
      class=" border-indigo-500 bg-indigo-200 rounded-md border-2 inset-2 h-48 w-96 mb-3.5 flex flex-col justify-between shadow-md"
    >
      <div class="mx-auto text-center px-4 pt-2">
        <p class="text-lg font-extralight">{production.company.name}</p>
      </div>
      <div class="mx-auto text-center px-4">
        <p class="text-2xl font-bold tracking-wide">{production.show.title}</p>
      </div>
      <div class="">
        <p class="text-lg text-center">{production.year}</p>
      </div>
    </div>
  {/if}

  <Section>Cast</Section>
  <ul class="list">
    {#each featuredCast as role}
      <li class="mb-1">
        <div class="flex flex-wrap pt-2">
          <div class="basis-full md:basis-1/3">
            <span class="text-lg font-semibold tracking-wide"
              >{role.character.characterName}</span
            >
          </div>
          {#each role.castMembers as person}
            <div><PersonChip person={person.person} /></div>
          {/each}
        </div>
      </li>
    {/each}
  </ul>
  <div class="mb-6">
    <a class="text-blue-800" href="./{production.slug.current}/cast">See all cast</a>
  </div>
  <Section>Production Team</Section>
  <ul class="list">
    {#each crew.slice(0, 5) as assignment}
    {@debug assignment}
      <li class="mb-1">
        <div class="flex flex-wrap pt-2">
          <div class="basis-full md:basis-1/3">
            <span class="text-lg font-semibold tracking-wide"
              >{assignment.job.jobName}</span
            >
          </div>
          {#each assignment.crewMembers as person}
            <PersonChip person={person.person} />
          {/each}
        </div>
      </li>
    {/each}
  </ul>
  <div class="mb-6">
    <a class="text-blue-800" href="./{production.slug.current}/productionTeam"
      >See all production team</a
    >
  </div>
</div>
