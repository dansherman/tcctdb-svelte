<script lang="ts">
	export let modal: HTMLDialogElement
</script>

<dialog bind:this={modal} on:close class="rounded-lg backdrop-brightness-50">
	<slot />
</dialog>