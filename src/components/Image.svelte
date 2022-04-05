<script lang="ts">
  import type {BlockProps} from '@portabletext/svelte'

  export let portableText: BlockProps
  $: block = portableText.block

  import { urlFor } from '$lib/img-url.js';
</script>

<img class="float-left mr-6" alt="" src="{urlFor(block).width(512).fit('fill').url()}" />