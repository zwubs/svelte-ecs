<script lang="ts">
	import type { Canvas } from '../canvas.svelte';
	import { PositionComponent, VelocityComponent } from '../components.svelte';
	import type { Entity } from '../entity.svelte';
	import type { Updater } from '../updater.svelte';

	let margin = 250;
	let turnFactor = 0.25;

	let { canvas, updater, entities } = $props<{ canvas: Canvas; updater: Updater; entities: Set<Entity> }>();
	updater.add(() => {
		entities.forEach((entity) => {
			const position = entity.componentsByConstructor.get(PositionComponent) as PositionComponent | undefined;
			const velocity = entity.componentsByConstructor.get(VelocityComponent) as VelocityComponent | undefined;
			if (!position) return;
			if (!velocity) return;
			if (position.x < margin) velocity.x += turnFactor;
			else if (position.x > canvas.width - margin) velocity.x -= turnFactor;
			if (position.y < margin) velocity.y += turnFactor;
			else if (position.y > canvas.height - margin) velocity.y -= turnFactor;
		});
	});
</script>

<slot />
