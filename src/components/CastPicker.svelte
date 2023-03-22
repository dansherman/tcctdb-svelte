<script lang="ts">
  import type {Person, Role} from '$lib/types'
  import Fuse from 'fuse.js'
  import {enhance, type SubmitFunction} from "$app/forms"
  export let people: Array<Person>
  export let pickerOpen: boolean
  export let chosenRole: Role
  let chosenPerson = people.slice(0)[0]
  let activeRow = -1
  const fuse = new Fuse(people, {
    keys: ['name']
  })
  let searchText = ""
  $: filteredPeople = fuse.search(searchText)
  const closePicker = () => {
    pickerOpen = false
  }
  const choosePerson = (i) => {
    chosenPerson = filteredPeople[i].item
    activeRow = i
  }

  const handleSubmit:SubmitFunction = () => {
    // `form` is the `<form>` element
    // `data` is its `FormData` object
    // `action` is the URL to which the form is posted
    // `cancel()` will prevent the submission
    // `submitter` is the `HTMLElement` that caused the form to be submitted
    if (chosenRole.character.allowMultiple == false) {
      closePicker()
    }
    return async ({ update }) => {
      // `result` is an `ActionResult` object
      // `update` is a function which triggers the logic that would be triggered if this callback wasn't set
      await update()
    };
  }
</script>
<div class="relative z-10" role="dialog" aria-modal="true">
  <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
  <div class="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity"></div>

  <div class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
    <!--
      Command palette, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 scale-95"
        To: "opacity-100 scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 scale-100"
        To: "opacity-0 scale-95"
    -->
    <div class="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">

      <form method="POST" action="?/assignRole" use:enhance={handleSubmit} >
        <input hidden name="roleRef" bind:value={chosenRole._id}/>
        <input hidden name="personRef" bind:value={chosenPerson._id}/>
        
        <div class="flex border-b-gray-200 border ">
          <button class="px-2.5">&larr;</button>
          <div class="text-center text-lg py-2  grow">Assign role for {chosenRole.character.characterName} </div>
          <button class=" px-2.5" on:click={closePicker}>×</button>
        </div>
        <div class="relative">
          
          <svg class="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
          </svg>
          
          <input type="text" bind:value={searchText} class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm" placeholder="Search..." role="combobox" aria-expanded="false" aria-controls="options">
        </div>
        
        <!-- Results, show/hide based on command palette state -->
        <ul class="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800" id="options" role="listbox">
          <!-- Active: "bg-indigo-600 text-white" -->
        {#each filteredPeople as result, i}
          {#if activeRow == i}
            <li class="cursor-default select-none px-4 py-2 bg-indigo-600 text-white" id="{i.toString()}" role="option" tabindex="-1">
              {result.item.name}
              <button type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                  <path d="M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" />
                </svg>
                
                
              </button>
            </li> 
          {:else}
            <li class="cursor-default select-none px-4 py-2" id="{i.toString()}" role="option" tabindex="-1">{result.item.name}</li>
          {/if}
        {:else}
          <p class="p-4 text-sm text-gray-500">No people found.</p>
        {/each}
        </ul>
      </form>
    </div>

  </div>
</div>