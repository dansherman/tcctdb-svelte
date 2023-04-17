import { derived, writable } from "svelte/store";
import { navigating } from "$app/stores";
import type { Photo } from "./types"
export let modalOpen = writable(false)
export let selectedImage = writable(<Photo>{})
let timer = null;
export const navigationIsDelayed = derived(navigating, (newValue, set) => {
  if (timer) { clearTimeout(timer); }
  if (newValue) {
    timer = setTimeout(() => set(true), 500);
  }
  set(false);
});