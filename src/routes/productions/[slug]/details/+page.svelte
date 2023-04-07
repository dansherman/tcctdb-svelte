<script lang="ts">

import Section from "$components/Section.svelte";
import PersonChip from "$components/PersonChip.svelte";
export let data
let {production} = data
  </script>

<pre>{JSON.stringify(production, null, 2)}</pre>