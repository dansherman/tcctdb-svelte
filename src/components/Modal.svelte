<script lang="ts">
	export let modal: HTMLDialogElement
	function closeModal () {
		modal.close()
	}
</script>

<dialog bind:this={modal} on:close class="sm:max-w-2xl md: max-w-4xl lg:max-w-6xl rounded-lg backdrop:backdrop-brightness-50 backdrop:backdrop-saturate-50 border-8 border-indigo-600">
	<slot />
</dialog>