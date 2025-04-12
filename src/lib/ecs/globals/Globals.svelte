<script module>
	export type Globals = { canvas: CanvasData, mouse: MousePosition };
</script>

<script lang="ts">
	import { getContext, onMount, type Snippet } from 'svelte';
	import Canvas, { type CanvasData } from './Canvas.svelte';
	import Mouse, { type MousePosition } from './Mouse.svelte';

	let { globalsDependents }: { globalsDependents?: Snippet<[Globals]> } = $props();

	onMount(() => {
		console.log(getContext('canvas'));
	});
</script>


{#if globalsDependents !== undefined}
	<Canvas>
		{#snippet canvasDependents({canvas})}
			<Mouse {canvas}>
				{#snippet mouseDependents({mouse})}
					{@render globalsDependents({canvas, mouse})}
				{/snippet}
			</Mouse>
		{/snippet}
	</Canvas>
{/if}
