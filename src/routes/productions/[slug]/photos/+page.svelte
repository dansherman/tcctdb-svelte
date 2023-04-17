<script lang="ts">
  import type {Photo} from "$lib/types"
import { urlFor } from "$lib/img-url.js";
import Masonry from 'svelte-bricks'
import { selectedImage, modalOpen } from '$lib/stores';
export let data;
  let { production } = data;
let items:Array<Photo> = production.productionPhotos
  if (items == null) {
    items = []
  }
	let i = 0
	for (let item of items) {
		item.id = i
		i++
	}
	let minColWidth = 192;
	let maxColWidth = 256;
	let gap = 4;
	$selectedImage = items[0]
	let h:number
let w:number

</script>
<svelte:window bind:innerHeight={h} bind:innerWidth={w}/>
<div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-1">
{#each items as item}

			
		
			
  {#if w > 450}
  <button on:click={()=>{$selectedImage = item; $modalOpen = true}}><img class="mx-auto w-96" src={urlFor(item.photo)?.width(384).url()} alt={item.caption} /></button>
  {:else}
  <img class="mx-auto w-96" src={urlFor(item.photo)?.width(384).url()} alt={item.caption} />
  {/if}


{:else}
<div class="">No photos found... ☹️</div>
{/each}
</div>