<script lang="ts">
	import type { Canvas } from '$lib/ecs/canvas.svelte';
	import { PositionComponent, SizeComponent } from '../components.svelte';
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
			const size = entity.get(SizeComponent);
			const halfWidth = (size?.size ?? 0) / 2;
			if (!position) return;
			if (position.x + halfWidth > canvas.width) position.x = canvas.width - halfWidth;
			else if (position.x - halfWidth < 0) position.x = halfWidth;
			if (position.y + halfWidth > canvas.height) position.y = canvas.height - halfWidth;
			else if (position.y - halfWidth < 0) position.y = halfWidth;
		});
	});
</script>

<slot />
