<script lang="ts">
	import { getContext, onMount, setContext } from 'svelte';
	import { createCanvas, type Canvas } from '../canvas.svelte';

	let canvas = $state<Canvas>();
	let element = $state<HTMLCanvasElement>();

	onMount(() => {
		if (!element) throw new Error('No canvas element');
		canvas = createCanvas(element);
		setContext('canvas', canvas);
		handleResize();
		console.log(getContext('canvas'));
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
