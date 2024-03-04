<script lang="ts">
	import type { Canvas } from '$lib/ecs/canvas.svelte';
	import {
		BounceComponent,
		IsBouncingComponent,
		PositionComponent,
		SizeComponent,
		VelocityComponent
	} from '../components.svelte';
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
			const velocity = entity.get(VelocityComponent);
			const size = entity.get(SizeComponent);
			const radius = (size?.size ?? 0) / 2;
			const canBounce = entity.has(BounceComponent);
			const isBouncing = entity.get(IsBouncingComponent);
			if (isBouncing) entity.delete(isBouncing);
			if (!position || !velocity || !canBounce) return;
			if (position.x + radius > canvas.width) {
				velocity.x = Math.abs(velocity.x) * -1;
				entity.add(new IsBouncingComponent());
			} else if (position.x - radius < 0) {
				velocity.x = Math.abs(velocity.x);
				entity.add(new IsBouncingComponent());
			}
			if (position.y + radius > canvas.height) {
				velocity.y = Math.abs(velocity.y) * -1;
				entity.add(new IsBouncingComponent());
			} else if (position.y - radius < 0) {
				velocity.y = Math.abs(velocity.y);
				entity.add(new IsBouncingComponent());
			}
		});
	});
</script>

<slot />
