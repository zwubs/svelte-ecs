<script lang="ts">
	import { scale } from '../constants';
	import type { Canvas } from '$lib/ecs/canvas.svelte';
	import { PerviousPositionsComponent, PositionComponent } from '../components.svelte';
	import type { Entity } from '$lib/ecs/entity.svelte';
	import type { Updater } from '$lib/ecs/updater.svelte';

	let { canvas, updater, entities } = $props<{
		canvas: Canvas;
		updater: Updater;
		entities: Set<Entity>;
	}>();
	updater.add(() => {
		entities.forEach((entity) => {
			const previousPositions = entity.get(PerviousPositionsComponent);
			const position = entity.get(PositionComponent);
			if (!previousPositions || !position) return;

			canvas.context.lineWidth = 1;
			previousPositions.positions.forEach((position, index) => {
				const x = canvas.width / 2 + position.x * scale;
				const y = canvas.height / 2 + position.y * scale;
				const nextPosition = previousPositions.positions[index + 1] ?? position;
				const nextX = canvas.width / 2 + nextPosition.x * scale;
				const nextY = canvas.height / 2 + nextPosition.y * scale;
				const alpha = index / previousPositions.max;
				canvas.context.strokeStyle = `rgba(255,255,255,${alpha})`;
				canvas.context.beginPath();
				canvas.context.moveTo(x, y);
				canvas.context.lineTo(nextX, nextY);
				canvas.context.stroke();
				canvas.context.closePath();
			});

			previousPositions.add(position);
		});
	});
</script>

<slot />
