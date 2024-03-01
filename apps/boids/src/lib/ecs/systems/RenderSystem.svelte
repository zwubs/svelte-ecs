<script lang="ts">
	import type { Canvas } from '../canvas.svelte';
	import type { Updater } from '../updater.svelte';

	let { canvas, updater } = $props<{
		canvas: Canvas;
		updater: Updater;
	}>();
	updater.add(() => {
		canvas.context.fillStyle = 'rgba(36, 44, 70, 0.5)';
		canvas.context.fillRect(0, 0, canvas.width, canvas.height);
	});
</script>

<slot />
