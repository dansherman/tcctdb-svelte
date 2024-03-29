import { goto, preloadData, pushState } from '$app/navigation'
import { modal } from './stores'
export async function showModal(e: MouseEvent) {
  // get URL
  const { href } = e.currentTarget as HTMLAnchorElement

  // get result of `load` function
  const result = await preloadData(href)

  // create new history entry
  if (result.type === 'loaded' && result.status === 200) {
    pushState(href, { selected: result.data })
    $modal.showModal()
  } else {
    goto(href)
  }
}

export function closeModal() {
  history.back()
}