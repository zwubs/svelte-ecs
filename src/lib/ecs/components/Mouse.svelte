<script lang="ts">
	import type { Canvas } from '../canvas.svelte';

	let { canvas } = $props<{ canvas: Canvas }>();

	let mouse = $state<{ x: number; y: number }>({ x: canvas.width / 2, y: canvas.height / 2 });

	function handleMouse(event: MouseEvent) {
		mouse = { x: event.pageX, y: event.pageY };
	}
</script>

<svelte:window on:mousemove={handleMouse} />

<slot {mouse} />
