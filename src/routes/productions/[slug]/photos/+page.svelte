<script lang="ts">
  import ProductionChip from "$components/ProductionChip.svelte";
import { urlFor } from "$lib/img-url.js";
  import {
    LightboxGallery,
    GalleryImage,
    GalleryThumbnail,
  } from "svelte-lightbox";
  export let data;
  let { production } = data;
</script>
{#if production.productionPhotos}
<LightboxGallery>
  <svelte:fragment slot="thumbnail">
    <div class="flex flex-wrap space-y-2 justify-start mx-auto max-w-3xl">
  {#each production.productionPhotos as photo, i}
      <div class="w-96">
      <GalleryThumbnail id={i}>
        <img src={urlFor(photo.photo).width(192).url()} alt="Simple lightbox" />
      </GalleryThumbnail>
    </div>
      {/each}
    </div>
    </svelte:fragment>
  {#each production.productionPhotos as photo}
    <GalleryImage>
      <img src={urlFor(photo.photo).url()} alt={photo.caption} />
    </GalleryImage>
  {/each}
</LightboxGallery>
{:else}
<div class="">No photos found... ☹️</div>
{/if}
