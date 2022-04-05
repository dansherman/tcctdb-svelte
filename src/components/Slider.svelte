<script>
  import { onMount, tick } from "svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let min = 0;
  export let max = 100;
  export let step = 2;
  export let current = 3;
  export let valueText;

  let sliding = false;
  let slider;
  let scale;
  onMount(() => {
    scale = slider.clientWidth / (max / step);
    function handleResize() {
      scale = slider.clientWidth / (max / step);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  $: dispatch("change", { value: current });

  function handleMouseMove(e) {
    if (sliding) {
      const distance = e.clientX - slider.getBoundingClientRect().left;
      const value = Math.round(distance / scale) * step;
      current = Math.max(Math.min(value, max), min);
    }
  }




  async function handleMouseDown(e) {
    sliding = true;

    const distance = e.clientX - slider.getBoundingClientRect().left;
    const value = Math.round(distance / scale) * step;
    current = Math.max(Math.min(value, max), min);
  }

  function handleKeydown(e) {
    if (e.keyCode === 37 || e.keyCode === 40) {
      e.preventDefault();
      const nextValue = current - step;
      current = Math.max(nextValue, min);
    } else if (e.keyCode === 38 || e.keyCode === 39) {
      e.preventDefault();
      const nextValue = current + step;
      current = Math.min(nextValue, max);
    }
  }

  function handleMouseup(e) {
    sliding = false;
  }
</script>

<svelte:body
  on:mousemove={handleMouseMove}
  on:mouseup={handleMouseup}
  on:mouseleave={handleMouseup} />
<div
  tabindex="0"
  aria-valuemax={max}
  aria-valuemin={min}
  aria-valuenow={current}
  aria-valuetext={valueText}
  aria-orientation="horizontal"
  role="slider"
  bind:this={slider}
  class="relative w-11/12 h-8 flex items-center cursor-pointer mx-auto"
  on:mousedown={handleMouseDown}
  on:keydown={handleKeydown}
>
  <div class="w-full h-2 bg-slate-200 rounded-full">
    <div class="absolute z-20 -translate-y-1 w-4 h-4 rounded-full bg-sky-400" style="left: calc({(current / max) * 100}% - 8.5px)" />
    <div class="w-full h-2 bg-sky-800 origin-left rounded-full" style="transform: scaleX({current / max})" />
  </div>
</div>

