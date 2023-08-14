<script>
  export let data;
  import Title from '$components/Title.svelte'
  let {show}  = data;
</script>
{@debug show}
<Title>{show.title}</Title>
