<script lang="ts">

import Section from "$components/Section.svelte";
import PersonChip from "$components/PersonChip.svelte";
export let data
let {cast, crew, production} = data
  </script>
<Section>Cast</Section>
<ul class="list">
  {#each cast.slice(0,5) as role}
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
...

<Section>Production Team</Section>
<ul class="list">
  {#each crew.slice(0,5) as job}
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
...