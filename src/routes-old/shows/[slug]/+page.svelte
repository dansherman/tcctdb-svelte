<script>
  export let data;
  import Title from '$components/Title.svelte'
  let show  = data;
</script>
<Title>{show.title}</Title>
