<script lang="ts">

import PersonChip from "$components/PersonChip.svelte";
export let data
let {cast, crew, production} = data
  </script>
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

