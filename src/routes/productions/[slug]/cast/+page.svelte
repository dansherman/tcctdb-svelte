<script lang="ts">
import PersonChip from "$components/PersonChip.svelte";
import CharacterPhoto from "$components/CharacterPhoto.svelte";
export let data
let {cast} = data
  </script>
<ul class="list divide-y">
  {#each cast as role}
    <li class="mx-auto max-w-xs md:max-w-full my-4 py-2 grid grid-cols-3 md:grid-cols-6">
      <div class=" pb-2 md:ml-0 col-span-3 md:col-span-2 text-center md:text-left">
          <span class="text-lg font-semibold tracking-wide">{role.characterName}</span>
        </div>
        <div class="md:ml-0 col-span-3 md:col-span-4 flex flex-wrap gap-3">
        {#each role.castMembers as castMember}
        <div class="mx-auto md:mx-0 w-full md:w-1/4 grid grid-cols-1 item">
          {#if role.character.roleSize == 'ensemble' || role.castMembers.length > 1}
            <div class="w-24 h-full mx-auto">
              <CharacterPhoto {castMember} {role} size={96}/>
            </div>
            <div class="w-24 mx-auto text-center"><PersonChip person={castMember.person} /></div>
          {:else}
          <div class="w-48 m:w-64 h-full mx-auto">
            <CharacterPhoto {castMember} {role} size={256}/>
          </div>
          <div class="w-48 m:w-64 text-center mx-auto"><PersonChip person={castMember.person} /></div>
          {/if}
        </div>
      {/each}
        </div>
    </li>
  {/each}
</ul>

