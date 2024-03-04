<script lang="ts">
	import { onMount } from 'svelte';
	import { createCanvas } from '../canvas.svelte';

	let canvas = $state<ReturnType<typeof createCanvas>>();
	let element = $state<HTMLCanvasElement>();

	onMount(() => {
		if (!element) throw new Error('No canvas element');
		canvas = createCanvas(element);
		handleResize();
	});

	function handleResize() {
		if (!canvas || !element) throw new Error('No canvas initialized');
		canvas.pixelRatio = window.devicePixelRatio;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		element.width = canvas.width;
		element.height = canvas.height;
	}
</script>

<svelte:window on:resize|passive={handleResize} />
<canvas bind:this={element} />

<slot {canvas} />

<style>
	canvas {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
</style>
