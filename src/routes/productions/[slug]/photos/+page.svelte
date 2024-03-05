<script lang="ts">
	import Lightbox from "$components/Lightbox.svelte";
  export let data;
  let production = data.production;
  let photos = production.photos;
  if (photos == null) {
    photos = [];
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-8 gap-y-16">
  {#each photos as photo}

    <Lightbox {photo}/>
  {:else}
    <div class="">No photos found... ☹️</div>
  {/each}
</div>