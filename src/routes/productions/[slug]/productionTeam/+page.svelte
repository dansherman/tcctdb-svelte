<script lang="ts">

import Section from "$components/Section.svelte";
import PersonChip from "$components/PersonChip.svelte";
import CrewPhoto from "$components/CrewPhoto.svelte";
export let data
let {cast, crew, production} = data
  </script>

<ul class="list">
  {#each crew as job}
  <li class="flex flex-wrap my-4 py-2 ">
    <div class="basis-full md:basis-1/4">
      <span class="text-lg font-semibold tracking-wide">{job.jobName}</span>
    </div>
    {#each job.people as person, i}
    <div class="w-48 grid grid-cols-1 item">
      <div class="w-24 h-24 mx-auto">
      <CrewPhoto {job} {i}/>
    </div>
    <div class="text-center"><PersonChip {person} /></div>
    </div>
  {/each}
  </li>
  {/each}
</ul>
