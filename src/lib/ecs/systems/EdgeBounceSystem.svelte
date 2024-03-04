<script lang="ts">
	import type { Canvas } from '../canvas.svelte';
	import { BounceComponent, IsBouncingComponent, PositionComponent, SizeComponent, VelocityComponent } from '../components.svelte';
	import type { Entity } from '../entity.svelte';
	import type { Updater } from '../updater.svelte';

	let { canvas, updater, entities } = $props<{ canvas: Canvas; updater: Updater; entities: Set<Entity> }>();
	updater.add(() => {
		entities.forEach((entity) => {
			const position = entity.componentsByConstructor.get(PositionComponent) as PositionComponent;
			const velocity = entity.componentsByConstructor.get(VelocityComponent) as VelocityComponent;
			const size = entity.componentsByConstructor.get(SizeComponent) as SizeComponent | undefined;
			const radius = (size?.size ?? 0) / 2;
			const canBounce = entity.componentsByConstructor.has(BounceComponent);
			const isBouncing = entity.componentsByConstructor.get(IsBouncingComponent) as IsBouncingComponent | undefined;
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
