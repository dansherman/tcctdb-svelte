<script>
  export let person
  </script>
<span class="mx-1 px-1 text-lg font-medium border-b-sky-500 border rounded-sm hover:bg-sky-200 hover:shadow-md">
  <a href="/people/{person.slug.current}">{person.name}</a>
</span>