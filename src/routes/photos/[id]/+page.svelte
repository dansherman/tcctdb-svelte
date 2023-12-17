<script lang="ts">
  export let data;
  import { urlFor } from '$lib/imgUrl.ts';

  import { scale, fade, fly } from "svelte/transition";
  let {photo} = data
  let src = urlFor(photo.photo)?.height(2048).url() || ""
  let showInfoPane = false
  function preload(src: string) {
    return new Promise(function (resolve) {
      let img = new Image();
      img.onload = resolve;
      img.src = src;
    });
  }
  
  console.log(photo)
</script>
<svelte:head>
  <title></title>
</svelte:head>
<div class="center">
  
  <div class="">
    {#if photo}
      {#await preload(src)}
        <div class="w-96 h-96">
          <div class="w-48 mx-auto">
            Loading...
          </div>
        </div>
      {:then _}
        <img
          class="w-full object-contain min-h-0"
          width=2048
          {src}
          alt={photo.caption}
        />
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
        <div class="grid grid-cols-3 text-purple-700 font-medium pt-2 pb-1">
          <div class="text-left">{photo.caption || ""}</div>
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
          <div class="text-right">
            Photo by: {photo.attribution}
          </div>
        </div>
      {:catch error}
        <p>An error occurred!</p>
      {/await}
    {:else}
      <div>No photo selected?</div>
    {/if}
  </div>
</div>
