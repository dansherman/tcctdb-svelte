<script>
  import { dndzone } from "svelte-dnd-action";
  import { overrideItemIdKeyNameBeforeInitialisingDndZones } from "svelte-dnd-action";
  export let characterList
  import CharacterListItem from "$components/CharacterListItem.svelte";

  overrideItemIdKeyNameBeforeInitialisingDndZones("_id");
  const handleDndConsider = (e) => {
    characterList = e.detail.items;
  };
  const handleDndFinalize = (e) => {
    characterList = e.detail.items;
  };
</script>
<div class="">
  <ul use:dndzone={{ items: characterList }}
  on:consider={handleDndConsider}
  on:finalize={handleDndFinalize} class="">

  {#each characterList as character(character._id)}
  <CharacterListItem character={character} />
  {/each}

</ul>
</div>