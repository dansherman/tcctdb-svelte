<script lang="ts">
import PersonChip from "$components/PersonChip.svelte";
import CharacterPhoto from "$components/CharacterPhoto.svelte";
export let data
let {cast, crew, production} = data
  </script>
<ul class="list divide-y">
  {#each cast as role}
    
    <li class="flex flex-wrap my-4 py-2 ">
        <div class="basis-full md:basis-1/4">
          <span class="text-lg font-semibold tracking-wide">{role.characterName}</span>
        </div>
        {#each role.people as person, i}
        <div class="w-48 grid grid-cols-1 item">
          <div class="w-24 h-24 mx-auto">
          <CharacterPhoto {role} {i}/>
        </div>
        <div class="text-center"><PersonChip {person} /></div>
        </div>
      {/each}
    </li>
  {/each}
</ul>

