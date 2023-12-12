<script lang="ts">

import { urlFor } from "$lib/imgUrl.js";
import { scale, fade, fly } from "svelte/transition";
  export let photo
  let src_sm = urlFor(photo.photo)?.height(256).url()
  let src_lg = urlFor(photo.photo)?.height(2048).url()
  let showInfoPane = false;
</script>
<style>
  body:has(dialog:target) {
  /* Prevent page scrolling when lightbox open (for browsers that support :has()) */
  position: fixed;
}

a[href^='#lightbox-'] {
  /* Show 'zoom in' cursor over lightboxed images. */
  cursor: zoom-in;
}

.lightbox {
  /* Lightboxes are hidden by-default, but occupy the full screen and top z-index layer when shown. */
  all: unset;
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: #333;
}

.lightbox:target {
  /* If the target of the URL points to the lightbox, it becomes visible. */
  display: flex;
}

.lightbox img {
  /* Images fill the lightbox. */
  object-fit: contain;
  height: 100%;
  width: 100%;
}
.close {
  background: #000;
border-radius: 50%;
border: 4px solid white;
box-sizing: content-box;
color: white;
display: block;
font-size: var(--step-5);
height: var(--step-5);
line-height: calc(var(--step-5) * 0.9);
position: absolute;
right: min(1vw,1vh);
text-align: center;
text-decoration: none;
top: min(1vw,1vh);
width: var(--step-5);
}
  </style>

<figure id="{photo._id}" aria-describedby="caption-{photo._id}">
  <a href="#lightbox-{photo._id}" role="button" class="cursor-zoom">
    <img src={src_sm} alt="{photo.caption}">
  </a>
  <figcaption id="caption-{photo._id}">
    {#if photo.caption}{photo.caption}{:else}&nbsp;{/if}
  </figcaption>

</figure>

<dialog id="lightbox-{photo._id}" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity hidden target:flex max-h-screen" transition:fade>
  <div class="w-full">
  <img src="{src_lg}" loading="lazy" alt="{photo.caption}" class=" max-h-[85vh] object-contain min-h-0">
  {#if showInfoPane}
  <div class="-mt-12 h-12 bg-slate-300 opacity-90 font-medium text-slate-900 px-6 backdrop-blur-md" transition:fly="{{ y: 10, duration: 200 }}">
    <p>{#if photo.roles}
      {#each photo.roles as role, i}
      {#if i != 0} • {/if}
        <a class="pr-1 hover:text-blue-700" href="/people/{role.castMember.slug.current}">{role.castMember.name} as {role.characterName}</a>
      {/each}
    {/if}
    </p>
  </div>
  {/if}
  <div class="grid grid-cols-3 text-white font-medium pt-2 pb-1">
    <div class="text-left">{ photo.caption || ""}</div>
    <div class="text-center">
      <button
        on:click={() => {
          showInfoPane = !showInfoPane;
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <div class="text-right pr-4">
      Photo by: {photo.attribution}
    </div>
  </div>
  </div>
  <div class="absolute right-0 top-0 pr-4 pt-4">
  <a href="#{photo._id}" title="Close image" role="button" class="rounded-md bg-zinc-700 text-zinc-200 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  </a>
  </div>
</dialog>