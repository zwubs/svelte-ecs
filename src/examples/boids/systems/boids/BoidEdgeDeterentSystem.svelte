<script lang="ts">
	import type { Canvas } from '$lib/ecs/canvas.svelte';
	import { BoidComponent, PositionComponent, VelocityComponent } from '../../components.svelte';
	import type { Entity } from '$lib/ecs/entity.svelte';
	import type { Updater } from '$lib/ecs/updater.svelte';

	let margin = 250;
	let turnFactor = 0.25;

	let { canvas, updater, entities } = $props<{
		canvas: Canvas;
		updater: Updater;
		entities: Set<Entity>;
	}>();
	updater.add(() => {
		entities.forEach((entity) => {
			const isBoid = entity.has(BoidComponent);
			if (!isBoid) return;
			const position = entity.get(PositionComponent);
			const velocity = entity.get(VelocityComponent);
			if (!position || !velocity) return;
			if (position.x < margin) velocity.x += turnFactor;
			else if (position.x > canvas.width - margin) velocity.x -= turnFactor;
			if (position.y < margin) velocity.y += turnFactor;
			else if (position.y > canvas.height - margin) velocity.y -= turnFactor;
		});
	});
</script>

<slot />
