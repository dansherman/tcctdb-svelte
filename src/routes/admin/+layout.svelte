<script lang='ts'>
	import { page } from '$app/stores';
  import MobileMenu from '$components/shell/MobileMenu.svelte';
  import SidebarLeft from '$components/shell/SidebarLeft.svelte';
	import { icons } from '$lib/icons'
	$: path = $page.url.pathname
	export let data
	$: rightOpen = false
	import("../../app.css")

</script>


<div class="flex h-screen">
  <!-- Narrow sidebar -->
  <SidebarLeft />

  <!--
    Mobile menu

    Off-canvas menu for mobile, show/hide based on off-canvas menu state.
  -->
  <MobileMenu />

  <!-- Content area -->
  <div class="flex flex-1 flex-col overflow-hidden">


    <!-- Main content -->
    <div class="flex flex-1 items-stretch overflow-hidden">
      <main class="flex-1 overflow-y-auto">
        <!-- Primary column -->
<slot />
      </main>
		

    </div>
  </div>
</div>
