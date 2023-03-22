<script>
  import { createEventDispatcher, onMount } from 'svelte'

  export let value, options, required = true

  const dispatch = createEventDispatcher()
  let editing = false, original

  onMount(() => {
    original = value
  })

  function edit() {
    editing = true
  }

  function submit() {
		if (value != original) {
			dispatch('submit', value)
		}
		
    editing = false
  }

  function keydown(event) {
    if (event.key == 'Escape') {
      event.preventDefault()
      value = original
      editing = false
    }
  }
	
	function focus(element) {
		element.focus()
	}
</script>

{#if editing}
  <form action="?saveCharacter" on:submit|preventDefault={submit}  on:keydown={keydown}>
    <select bind:value on:blur={submit} {required} use:focus>
      {#each options as option}
      <option value={option.value}>{option.title}</option>
      {/each}
    </select>
  </form>
{:else}
  <div on:click={edit}>
    {#if value}
      {value}
    {:else}
      -
      {/if}
  </div>
{/if}