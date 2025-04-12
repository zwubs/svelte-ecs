<script module>
	const contextError = (): never => {
		throw new Error(
			'Cannot access context prior to initialization, make sure you access it within onMount.'
		);
	};

	export const createCanvas = (element: HTMLCanvasElement) => {
		let context = $state<CanvasRenderingContext2D>(element.getContext('2d') ?? contextError());

		let width = $state(window.innerWidth);
		let height = $state(window.innerHeight);
		let pixelRatio = $state(window.devicePixelRatio);

		return {
			get context() {
				return context ?? contextError();
			},
			get width() {
				return width;
			},
			set width(value) {
				width = value;
			},
			get height() {
				return height;
			},
			set height(value) {
				height = value;
			},
			get pixelRatio() {
				return pixelRatio;
			},
			set pixelRatio(value) {
				pixelRatio = value;
			}
		};
	};

	export type CanvasData = ReturnType<typeof createCanvas>;
</script>

<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	let { canvasDependents }: { canvasDependents?: Snippet<[{ canvas: CanvasData }]> } = $props();
	let canvas = $state<CanvasData>();
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
<canvas bind:this={element} ></canvas>

{#if canvas && canvasDependents !== undefined}
	{@render canvasDependents({ canvas } )}
{/if}

<style>
	canvas {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
</style>
