<script>
  export let person = {};
  export let width = 800;
  export let height = 800;
  export let link = true;
  import { urlFor } from "$lib/img-url.js";
  let href = "";
  try {
    if (link == true) {
      href = `/people/${person.slug.current}`;
    }
  } catch {
    href = "";
  }
</script>

{#if href != "" && person}
  <a class="font-semibold text-black" {href}>
    {#if person.headshot}
      <img
        src={urlFor(person.headshot).width(width).height(height).url()}
        alt={person.name}
        class="object-contain rounded-full w-full h-full object-top"
      />
    {:else}
      <span class="inline-block rounded-full overflow-hidden bg-emerald-100">
        <svg
          class="h-full w-full text-emerald-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </span>
    {/if}
  </a>
{:else if person && person.headshot}
  <img
    src={urlFor(person.headshot).width(width).height(height).url()}
    alt={person.name}
    class="object-contain rounded-full w-full h-full object-top"
  />
{:else}
  <span class="inline-block rounded-full overflow-hidden bg-sky-100">
    <svg
      class="h-full w-full text-sky-300"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  </span>
{/if}
