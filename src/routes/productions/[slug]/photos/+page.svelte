<script lang="ts">
  import { goto } from "$app/navigation";  
  import { selectedImage, modalOpen } from "$lib/stores";
  import { photoUrl } from "$lib/photos.js";
  import PictureBox from "$components/PictureBox.svelte";
  export let data;
  let { photos, production } = data;
  let h: number;
  let w: number;

  const handlePhotoClick = (photo) => {
    $selectedImage = photo;
    console.log(photo.photoRelationships)
    //if mobile then download/open otherwise modal
    if (w > 450) {
      $modalOpen = true;
    } else {
      goto(photoUrl(photo.filename));
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
        src={photoUrl(photo.thumbname)}
        alt={photo.caption}
      /></button
    >
  {:else}
    <div class="">No photos found... ☹️</div>
  {/each}
</div>
<PictureBox {h}/>