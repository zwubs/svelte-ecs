<script lang="ts">
	import Canvas from './Canvas.svelte';

	let { canvas } = $props<{ canvas?: Canvas }>();

	$effect(() => {
		if (!canvas) return;
		canvas.context.lineCap = 'round';
		canvas.context.beginPath();
		canvas.context.fillStyle = '#BBB';
		canvas.context.strokeStyle = '#FFF';
		canvas.context.lineWidth = 2;
		canvas.context.translate(50, 50);
		canvas.context.rotate((0 * Math.PI) / 180);
		canvas.context.fillRect(-(50 / 2), -(50 / 2), 50, 50);
		canvas.context.rect(-(50 / 2), -(50 / 2), 50, 50);
		canvas.context.stroke();
		canvas.context.setTransform(1, 0, 0, 1, 0, 0);
	});
</script>

<div></div>

<slot />
