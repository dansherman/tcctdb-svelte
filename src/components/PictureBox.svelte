<script lang="ts">
  import { urlFor } from "$lib/imgUrl.js";
  import { scale, fade, fly } from "svelte/transition";
  import { modalOpen, selectedImage } from "$lib/stores";
  import { goto } from "$app/navigation";
  function preload(src: string) {
    return new Promise(function (resolve) {
      let img = new Image();
      img.onload = resolve;
      img.src = src;
    });
  }
  export let h: number;
  let width: number;
  let height: number;

  let showInfoPane = false;
  $: src = (() => {
    height = Math.round(h * 0.85);
    width = $selectedImage.metadata?.dimensions?.aspectRatio * height || 800;
    return urlFor($selectedImage.photo)?.height(height).url() || "";
  })();
  let g = async (url) => {
    goto(url)
    $modalOpen = false
  }
  </script>
  
  {#if $modalOpen}
  <div
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      transition:fade
    />

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        transition:scale
      >
        <div
          class="relative transform rounded-lg bg-zinc-700 text-left shadow-xl transition-all sm:my-8 p-2 max-h-screen"
        >
          <div class="absolute right-0 top-0 pr-4 pt-4">
            <button
              on:click={() => {
                $modalOpen = false;
              }}
              type="button"
              class="rounded-md bg-zinc-700 text-zinc-200 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span class="sr-only">Close</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="">
            {#if $selectedImage.photo}
              {#await preload(src)}
                <div class="w-96 h-96">
                  <div class="w-48 mx-auto">
                    Loading...
                  </div>
                </div>
              {:then _}
                <img
                  class="w-full object-contain min-h-0"
                  {height}
                  {width}
                  {src}
                  alt={$selectedImage.caption}
                />
                {#if showInfoPane}
                  <div class="-mt-12 h-12 bg-slate-300 opacity-90 font-medium text-slate-900 px-6 backdrop-blur-md" transition:fly="{{ y: 10, duration: 200 }}">
                    <p>{#if $selectedImage.roles}
                      {#each $selectedImage.roles as role, i}
                      {#if i != 0} • {/if}
                        <button class="pr-1 hover:text-blue-700" on:click={()=>{g("/people/"+role.castMember.slug.current)}}>{role.castMember.name} as {role.characterName}</button>
                      {/each}
                    {/if}
                    </p>
                  </div>
                {/if}
                <div class="grid grid-cols-3 text-white font-medium pt-2 pb-1">
                  <div class="text-left">{$selectedImage.caption || ""}</div>
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
                    Photo by: {$selectedImage.attribution}
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
      </div>
    </div>
  </div>
{/if}