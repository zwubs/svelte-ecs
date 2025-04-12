<script module>
	export type MousePosition = { x: number; y: number };
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { CanvasData } from './Canvas.svelte';

	let { canvas, mouseDependents } = $props<{
		canvas: CanvasData;
		mouseDependents?: Snippet<[{ mouse: MousePosition }]>;
	}>();

	let mouse = $state<MousePosition>({ x: canvas.width / 2, y: canvas.height / 2 });

	function handleMouse(event: MouseEvent) {
		mouse = { x: event.pageX, y: event.pageY };
	}
</script>

<svelte:window on:mousemove={handleMouse} />

{#if mouseDependents !== undefined}
	{@render mouseDependents({ mouse } )}
{/if}
