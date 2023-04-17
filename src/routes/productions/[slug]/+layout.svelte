<script lang="ts">
  import Title from "$components/Title.svelte";
  import SubTitle from "$components/SubTitle.svelte";

  import { scale, fade, fly } from 'svelte/transition';
import { urlFor } from "$lib/img-url.js";
  export let data;
  import { page } from "$app/stores";
  import {modalOpen, selectedImage} from "$lib/stores"
  let production = data.production
  let show = production.show;
  
  $: path = $page.url.pathname;
  let pages = [
    {url:production.slug.current,name:'Summary'},
    {url:`${production.slug.current}/cast`,name:'Cast'},
    {url:`${production.slug.current}/productionTeam`,name:'Production Team'},
    {url:`${production.slug.current}/photos`,name:'Photos'},
  ]
  let activePage = "border-indigo-500 text-indigo-600"
  let defaultPage = "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
  let h:number
let w:number
$:height = Math.round(h*0.9)
$:width = w
</script>

<svelte:head>
  <title>{show.title}</title>
</svelte:head>

<svelte:window bind:innerHeight={h} bind:innerWidth={w}/>
<Title>{show.title}</Title>
<SubTitle>
  <a href="/companies/{production.company.slug.current}"
    >{production.company.name}</a
  >
</SubTitle>
<div>

  <div class="block">
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex justify-between sm:justify-start sm:space-x-8" aria-label="Tabs">
        {#each pages as p}
          {#if path.endsWith(p.url)}
            <a href="/productions/{p.url}" class="{activePage} whitespace-nowrap border-b-2 py-2 sm:py-4 px-1 text-xs sm:text-sm md:text-md font-medium">{p.name}</a>
            {:else}
            <a href="/productions/{p.url}" class="{defaultPage} whitespace-nowrap border-b-2 py-2 sm:py-4 px-1 text-xs sm:text-sm md:text-md font-medium">{p.name}</a>

            {/if}
        {/each}
        
      </nav>
    </div>
  </div>
</div>
<slot/>
{#if $modalOpen}
<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" transition:fade></div>

  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" transition:scale>
      <div class="relative transform rounded-lg bg-zinc-700 text-left shadow-xl transition-all sm:my-8 p-2 max-h-screen">
        <div class="absolute right-0 top-0 pr-4 pt-4 ">
          <button on:click={()=>{$modalOpen = false}} type="button" class="rounded-md bg-zinc-700 text-zinc-200 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span class="sr-only">Close</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div>
          {#if $selectedImage.photo}
          <img height={height} src="{urlFor($selectedImage.photo)?.height(height).url()}" alt="{$selectedImage.caption}" />
          {:else}
          <div>No photo selected?</div>
          {/if}
        </div>

      </div>
    </div>
  </div>
</div>
{/if}