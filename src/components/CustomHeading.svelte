<!-- CustomHeading (blockStyle) -->
<script lang="ts">
  import type {BlockProps} from '@portabletext/svelte'

  export let portableText: BlockProps

  $: block = portableText.block

  $: style = block.style

  $: anchorId = `heading-${block._key}`
</script>

<!-- If preceded by heading, have a higher margin top -->
<div class="relative" id={anchorId}>
  {#if style === 'h1'}
    <h1 class="text-4xl font-black"><slot /></h1>
  {:else if style === 'h2'}
    <h2 class="text-3xl"><slot /></h2>
  {:else if style === 'h3'}
    <h3 class="text-lg text-gray-800 font-bold mt-4"><slot /></h3>
  {:else}
    <h4 class="text-lg text-gray-600"><slot /></h4>
  {/if}
</div>