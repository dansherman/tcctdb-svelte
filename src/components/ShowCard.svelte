<script>
  export let show = {};
  export let size = 96;
  export let anchor = "";
  export let hideLabel = false
  import { urlFor } from '$lib/img-url.js';
  const sizeClass = `w-${size} h-${size} object-center mx-auto`
  // let p = person.person
</script>
<div>
<div class="border-2 border-slate-100 bg-slate-50 overflow-hidden object-center rounded-xl ">
  <div class={sizeClass}>
    <a href="/shows/{show.slug.current}">
      <img src={urlFor(show.poster).height(size*4).url()} alt={show.title} class="mx-auto max-w-{size} max-h-full object-center"/>
    </a>
  </div>
  
  </div>
    {#if hideLabel != true}
    <div class="w-8/12 mx-auto -translate-y-6 text-base leading-6 font-light space-y-1 bg-white border-2 border-slate-300 rounded-lg p-2">
      <a class="font-bold text-center" href="/shows/{show.slug.current}{anchor}">
        <h3>{show.title}</h3>
      </a>
      
    </div>
    {/if }
</div>