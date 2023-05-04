<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Photo } from "$lib/types";
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
<button
      on:click={() => {
        handlePhotoClick(item);
      }}
      >
      <slot/>
</button>