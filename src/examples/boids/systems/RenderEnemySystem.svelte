<script lang="ts">
	import type { Canvas } from '$lib/ecs/canvas.svelte';
	import { PositionComponent, EnemyComponent } from '../components.svelte';
	import type { Entity } from '$lib/ecs/entity.svelte';
	import type { Updater } from '$lib/ecs/updater.svelte';

	let { canvas, updater, entities } = $props<{
		canvas: Canvas;
		updater: Updater;
		entities: Set<Entity>;
	}>();
	updater.add(() => {
		entities.forEach((entity) => {
			const position = entity.get(PositionComponent);
			const isEnemey = entity.has(EnemyComponent);
			if (!position || !isEnemey) return;
			canvas.context.lineCap = 'round';
			canvas.context.beginPath();
			canvas.context.strokeStyle = '#F44';
			canvas.context.lineWidth = 2;
			canvas.context.beginPath();
			canvas.context.arc(position.x, position.y, 10, 0, 2 * Math.PI);
			canvas.context.stroke();
		});
	});
</script>

<slot />
