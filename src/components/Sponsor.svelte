<script>
    export let sponsor = {};
    import { urlFor } from '$lib/img-url.js';
</script>
<a class="font-semibold text-black" href="{sponsor.website}">
  <div class="w-40 h-30 md:w-60 md:h-48 grid place-content-center">
  {#if sponsor.logo}
    <img src={`${urlFor(sponsor.logo).width(240).auto('format').fit('clip')}`} alt={sponsor.name} class="place-content-center rounded-md" />
  {:else}
    <span class="text-x align-middle">{sponsor.name}</span>
  {/if}
  </div>
</a>
  
  