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
<Grid>
  {#each photos as photo}
  <Lightbox {photo}/>
  {/each}
</Grid>