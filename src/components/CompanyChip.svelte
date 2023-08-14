<script lang="ts">
  export let company
  </script>
<span class="mx-1 px-1 text-lg font-medium border-b-amber-500 border rounded-sm hover:bg-amber-200 hover:shadow-md">
  <a href="/companies/{company.slug.current.current}">{company.name}</a>
</span>