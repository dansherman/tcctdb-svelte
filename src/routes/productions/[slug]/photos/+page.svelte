<script lang="ts">
  import { goto } from "$app/navigation";
  import { urlFor } from "$lib/imgUrl.js";
  import { selectedImage, modalOpen } from "$lib/stores";
  import PictureBox from "$components/PictureBox.svelte";
  export let data;
  let production = data.production;
  let items = production.productionPhotos;
  if (items == null) {
    items = [];
  }
  let i = 0;
  for (let item of items) {
    item.id = i;
    i++;
  }
  if (items.length > 0) {
    $selectedImage = items[0];
  }
  let h: number;
  let w: number;
  const handlePhotoClick = (item) => {
    $selectedImage = item;
    //if mobile then download/open otherwise modal
    if (w > 450) {
      $modalOpen = true;
    } else {
      goto(urlFor(item.photo).url());
    }
  };
</script>

<svelte:window bind:innerHeight={h} bind:innerWidth={w} />
<div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-1">
  {#each items as item}
    <button
      on:click={() => {
        handlePhotoClick(item);
      }}
      ><img
        class="mx-auto w-96"
        src={urlFor(item.photo)?.width(384).url()}
        alt={item.caption}
      /></button
    >
  {:else}
    <div class="">No photos found... ☹️</div>
  {/each}
</div>
<PictureBox {h}/>