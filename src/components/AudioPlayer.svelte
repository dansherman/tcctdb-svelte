<script>
	import Slider from './Slider.svelte';
	export let track = {}
	export let paused = true
	$: src = track.src
	$: displayTitle = track.displayTitle
	$: valueText = `${Math.round(currentTime)} / ${Math.round(duration)} `
	let audio;

	let duration;
	let muted = false;
	let currentTime = 0;

	let volume = 1;
	const format = (number) => {
    const minutes = Math.floor(number / 60);
    const secs = Math.floor(number % 60);
    
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
</script>



	<audio
		{src}
		bind:duration={duration}		 
		bind:currentTime={currentTime}
		bind:muted={muted}
		bind:paused={paused}
		bind:volume={volume}
	></audio>
	<div class="border-2 border-slate-400 rounded-md p-2">
	<h2 class="pb-6 w-11/12 mx-auto text-2xl font-medium text-center">{displayTitle}</h2>
	<div class="w-24 mx-auto">
	<button on:click={e => paused = !paused} >
		{#if paused}
		<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
			<path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
			<path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>
		{:else}
		<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
			<path stroke-linecap="round" stroke-linejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>
		{/if}
	</button>
	</div>
	{#if duration}
	<Slider
		max={duration}
		min={0}
		step={duration / 200}
		current={currentTime}
		valueText={valueText}
		on:change={e => currentTime = e.detail.value}
  />
	<div class="w-11/12 mx-auto">
	<span>{format(currentTime)} / {format(duration)}</span>
</div>
{/if}
</div>
