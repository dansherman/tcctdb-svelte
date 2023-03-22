<script lang="ts">
  export let data;
  import { enhance, type SubmitFunction } from "$app/forms";
    import { vocalRanges } from "$lib/vocalRanges.js";
  import { dndzone } from "svelte-dnd-action";
  import { overrideItemIdKeyNameBeforeInitialisingDndZones } from "svelte-dnd-action";
  overrideItemIdKeyNameBeforeInitialisingDndZones("_id");
  $: characterList = data.characters

  const handleDndConsider = (e) => {
    characterList = e.detail.items;
  };
  const handleDndFinalize = (e) => {
    characterList = e.detail.items;
  };
  const saveCharacterOrder = () => {
    let updateCharacterList = []
    for (let i in characterList) {
      let character = characterList[i]
      updateCharacterList.push({_id:character._id, field:'sortOrder', value:parseInt(i)})
    }
    fetch('/api/update',{
        method: 'POST',
        body: JSON.stringify(updateCharacterList)
      })
  }
  const addCharacter: SubmitFunction = (input) => {
    characterList.push(input.data)
    return async (options) => {
      // do something after the form submits
      console.log(options)
    }
  }
  const saveCharacter: SubmitFunction = (input) => {
    characterList = characterList.map(char => char.editing = false)
    return async (options) => {
    }
  }
</script>

<div>

  <div class="">
    <ul><li class="">
      <div class="sm:py-0 sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 border-t border-gray-200">
        <div class="flex justify-start text-lg font-bold text-gray-900 py-2">  
          Name
        </div>
        <div class="text-lg font-bold text-gray-900 py-2">
          Vocal Range
        </div>
        <div class="text-lg font-bold text-gray-900 py-2">Notes</div>  
        <div class="sr-only">save</div>  
      </div>
    </li></ul>
    <ul use:dndzone={{ items: characterList }}
    on:consider={handleDndConsider}
    on:finalize={handleDndFinalize} class="">
  
    {#each characterList as character, sortOrder (character._id)}
    <li class="" on:focus={()=>character.editing = true}  >
      {#if character.editing}
      <form action="?/saveCharacter" method="POST" use:enhance={saveCharacter} >
          <div class="sm:py-4 sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 border-t border-gray-200">
          <input bind:value={character._id} name='_id' hidden/>
            <div class="flex justify-start font-medium text-gray-900 py-2">  
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input bind:value={character.characterName} name='characterName'/>
          </div>
          <div class="text-gray-900 py-2">
            <select bind:value={character.vocalRange} name='vocalRange'>
              {#each vocalRanges as option}
              <option value={option.value}>{option.title}</option>
              {/each}
            </select>
          </div>
          <div class="text-gray-900 py-2">
            <input bind:value={character.notes} name='notes'/>
          </div> 
          <div>
            <button type="submit">save</button>
          </div> 
        </div>
        
        </form> 
        {:else}
        <div class="sm:py-4 sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 border-t border-gray-200">
          <div class="flex justify-start font-medium text-gray-900 py-2">  
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {character.characterName}
          </div>
          <div class="text-gray-900 py-2">
            {character.vocalRange}
          </div>
          <div class="text-gray-900 py-2">
          {character.notes}
          </div>
          <div></div>
        </div>
        {/if}
    </li>
    {/each}
  
  </ul>
  </div>

  <form class="" method="POST" use:enhance={addCharacter} action="?/addCharacter" >
    <input type="string" name="showId" id="showId" hidden value={data._id} />
    <label for="newCharacter" class="sr-only">Add a Character</label>
    <div class="mt-1 flex rounded-md shadow-sm">
      <div class="relative flex flex-grow items-stretch focus-within:z-10">
        <input
          type="string"
          name="newCharacter"
          id="newCharacter"
          class="block w-full rounded-none rounded-l-md border-gray-300 pl-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="add a character"
        />
        <button
          type="submit"
          class="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>

          <span>Add</span>
        </button>
      </div>
    </div>
  </form>
    <button
              class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              on:click={saveCharacterOrder}>Save Character Order</button
            >
</div>
