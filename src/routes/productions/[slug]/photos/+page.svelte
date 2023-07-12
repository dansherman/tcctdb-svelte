<script lang="ts">
  import { goto } from "$app/navigation";
  import { selectedImage, modalOpen } from "$lib/stores";
  import { getThumbURL, getFullURL } from "$lib/photos.js";
  import PictureBox from "$components/PictureBox.svelte";
  export let data;
  let { photos } = data;
  let h: number;
  let w: number;

  const handlePhotoClick = (photo) => {
    $selectedImage = photo;
    console.log(photo.photoRelationships);
    //if mobile then download/open otherwise modal
    if (w > 450) {
      $modalOpen = true;
    } else {
      goto(getFullURL(photo.cf_id));
    }
  };
</script>

<svelte:window bind:innerHeight={h} bind:innerWidth={w} />
<div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-1">
  {#each photos as photo}
    <button
      on:click={() => {
        handlePhotoClick(photo);
      }}
      ><img
        class="mx-auto w-96"
        src={getThumbURL(photo.cf_id)}
        alt={photo.caption}
      />
    </button>
  {:else}
    <div class="">No photos found... ☹️</div>
  {/each}
</div>
<PictureBox {h} />
