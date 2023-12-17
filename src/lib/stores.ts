import { derived, writable } from "svelte/store";
import { navigating } from "$app/stores";
import type { Photo } from "./types"
export let modalOpen = writable(false)
export let selectedImage = writable(<Photo>{})
export let selectedId = writable(0)
export let modal = writable(<HTMLDialogElement>{})
let timer = null;
export const navigationIsDelayed = derived(navigating, (newValue, set) => {
  if (timer) { clearTimeout(timer); }
  if (newValue) {
    timer = setTimeout(() => set(true), 500);
  }
  set(false);
});