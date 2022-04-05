<script>
  export let show = {};
  export let anchor = "";
  import { urlFor } from '$lib/img-url.js';
  // let p = person.person
</script>
<div>
<div class="border-2 border-slate-100 bg-slate-50 overflow-hidden object-center rounded-xl ">
  <div class="w-96 h-96 object-center">
    <a href="/shows/{show.slug.current}">
      <img src={urlFor(show.poster).url()} alt={show.title} class="mx-auto max-w-84 max-h-full object-center"/>
    </a>
  </div>
  
  </div>

    <div class="w-80 mx-auto -translate-y-6 text-lg leading-6 font-medium space-y-1 bg-gradient-to-tr from-slate-200 to-slate-400 rounded-lg p-4">
      <a class="font-bold text-center" href="/shows/{show.slug.current}{anchor}">
        <h3>{show.title}</h3>
      </a>
      
    </div>

</div>