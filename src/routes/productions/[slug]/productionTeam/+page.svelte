<script lang="ts">

import Section from "$components/Section.svelte";
import PersonChip from "$components/PersonChip.svelte";
import CrewPhoto from "$components/CrewPhoto.svelte";
export let data
let {cast, crew, production} = data
  </script>


<ul class="list divide-y">
  {#each crew as assignment}
  <li class="mx-auto max-w-xs md:max-w-full my-4 py-2 grid grid-cols-3 md:grid-cols-6">
    <div class=" pb-2 col-span-3 md:col-span-2 text-center md:text-left">
          <span class="text-lg font-semibold tracking-wide">{assignment.jobName}</span>
        </div>
        <div class="col-span-3 md:col-span-4 flex flex-wrap justify-start gap-3">
          {#each assignment.crewMembers as crewMember}
        <div class="mx-auto md:mx-0 w-1/2 md:w-1/4 grid grid-cols-1 item">
          <div class="w-48 m:w-60 h-full mx-auto">
            <CrewPhoto {crewMember} {assignment}/>
        </div>
        <div class="w-48 m:w-60 text-center"><PersonChip person={crewMember.person} /></div>
        </div>
      {/each}
        </div>
    </li>
  {/each}
</ul>
