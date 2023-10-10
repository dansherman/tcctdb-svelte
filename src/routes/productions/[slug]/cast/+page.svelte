<script lang="ts">
  import CastCrewItem from '$components/CastCrewItem.svelte';

import CastCrewLabel from '$components/CastCrewLabel.svelte';

import CastCrewRow from '$components/CastCrewRow.svelte';

import CastCrewList from '$components/CastCrewList.svelte';
import CastCrewItems from '$components/CastCrewItems.svelte';
  import PersonChip from "$components/PersonChip.svelte";
  import CharacterPhoto from "$components/CharacterPhoto.svelte";
  export let data;
  let { cast } = data;
</script>

<CastCrewList>
  {#each cast as role}
  {@const characterName = role.characterName}
<CastCrewRow>
<CastCrewLabel>{characterName}</CastCrewLabel>
      <CastCrewItems>
        {#each role.castMembers as c}
      {@const castMember = c.castMember}
      {@const castPhotos = c.characterPhotos}
      {@debug c}
      {#if castMember}
      
      <CastCrewItem>
            <div class="w-48 m:w-1/4 text-center mx-auto">
              <CharacterPhoto {castPhotos} {castMember} {characterName}/>
            </div>
            <div class="w-48 m:w-1/4 text-center mx-auto">
                <PersonChip person={castMember} />
              </div>
    </CastCrewItem>
      {/if}
      {/each}
      </CastCrewItems>
    </CastCrewRow>
  {/each}
</CastCrewList>
