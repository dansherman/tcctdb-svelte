<script lang="ts">
	import { urlFor } from '$lib/imgUrl.js';
	import type { Photo } from '$lib/types';
	export let photo: Photo;
	let modal: HTMLDialogElement;
	let src_sm = urlFor(photo.photo)?.height(256).url();
	import Image from '../routes/photos/[id]/+page.svelte';
	import Modal from './Modal.svelte';
	import { page } from '$app/stores';

  import { goto, preloadData, pushState } from '$app/navigation'

async function showModal(e: MouseEvent) {
  // get URL
  const { href } = e.currentTarget as HTMLAnchorElement

  // get result of `load` function
  const result = await preloadData(href)

  // create new history entry
  if (result.type === 'loaded' && result.status === 200) {
    pushState(href, { selected: result.data })
    modal.showModal()
  } else {
    goto(href)
  }
}

function closeModal() {
  history.back()
}
</script>

<figure id={photo._id} aria-describedby="caption-{photo._id}" >
	<a
		on:click|preventDefault={showModal}
		href="/photos/{photo._id}"
		role="button"
		class="cursor-zoom"
	>
		<img src={src_sm} alt={photo.caption} class="rounded-lg"/>
	</a>
	<figcaption id="caption-{photo._id}" class="text-lg font-semibold leading-8 tracking-tight text-gray-90">
		{#if photo.caption}{photo.caption}{:else}&nbsp;{/if}
	</figcaption>
</figure>

<Modal bind:modal on:close={closeModal}>
		{#if $page.state.selected}
			<Image data={$page.state.selected} />
		{/if}
</Modal>