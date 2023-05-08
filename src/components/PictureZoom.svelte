<script lang="ts">
  import { goto } from "$app/navigation";
  export let item
  import { urlFor } from "$lib/img-url.js";
  import { selectedImage, modalOpen } from "$lib/stores";

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
<button
      on:click={() => {
        handlePhotoClick(item);
      }}
      >
      <slot/>
</button>