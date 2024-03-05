<script lang="ts">
  export let data;
  let {photos} = data
  import Title from "$components/Title.svelte"
  import Grid from "$components/Grid.svelte";
  import Lightbox from "$components/Lightbox.svelte";


</script> 
<svelte:head>
  <title>Photos</title>
</svelte:head>
<Title>Photos</Title>
<div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-8 gap-y-16">
  {#each photos as photo}
  <Lightbox {photo}/>
  {/each}
</div>