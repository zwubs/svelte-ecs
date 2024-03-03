<script lang="ts">
	import { scale } from '../constants';
	import type { Canvas } from '$lib/ecs/canvas.svelte';
	import { NameComponent, PositionComponent } from '../components.svelte';
	import type { Entity } from '$lib/ecs/entity.svelte';
	import type { Updater } from '$lib/ecs/updater.svelte';

	let { canvas, updater, entities } = $props<{
		canvas: Canvas;
		updater: Updater;
		entities: Set<Entity>;
	}>();
	updater.add(() => {
		canvas.context.font = '12px Arial';
		canvas.context.fillStyle = '#FFF';
		entities.forEach((entity) => {
			const position = entity.get(PositionComponent);
			const name = entity.get(NameComponent);
			if (!position || !name) return;
			const x = canvas.width / 2 + position.x * scale;
			const y = canvas.height / 2 + position.y * scale;
			canvas.context.fillText(name.name, x + 12, y + 4);
		});
		canvas.context.fill();
	});
</script>

<slot />
