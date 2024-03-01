<script lang="ts">
	let mouse = $state<{ x: number; y: number }>({ x: 0, y: 0 });

	function handleMouse(event: MouseEvent) {
		mouse = { x: event.pageX, y: event.pageY };
	}
</script>

<svelte:window on:mousemove={handleMouse} />

<slot {mouse} />
