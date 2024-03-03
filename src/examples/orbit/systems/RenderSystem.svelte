<script lang="ts">
	import { scale } from '../constants';
	import type { Canvas } from '$lib/ecs/canvas.svelte';
	import { MassComponent, PositionComponent } from '../components.svelte';
	import type { Entity } from '$lib/ecs/entity.svelte';
	import type { Updater } from '$lib/ecs/updater.svelte';

	let { canvas, updater, entities } = $props<{
		canvas: Canvas;
		updater: Updater;
		entities: Set<Entity>;
	}>();
	updater.add(() => {
		canvas.context.reset();
		entities.forEach((entity) => {
			const position = entity.get(PositionComponent);
			const mass = entity.get(MassComponent);
			if (!position) return;
			const x = canvas.width / 2 + position.x * scale;
			const y = canvas.height / 2 + position.y * scale;
			canvas.context.lineCap = 'round';
			canvas.context.beginPath();
			canvas.context.strokeStyle = '#FFF';
			canvas.context.lineWidth = 2;
			canvas.context.beginPath();
			canvas.context.arc(x, y, 2 + 4 * (mass?.mass ?? 1), 0, 2 * Math.PI);
			canvas.context.stroke();
		});
	});
</script>

<slot />
