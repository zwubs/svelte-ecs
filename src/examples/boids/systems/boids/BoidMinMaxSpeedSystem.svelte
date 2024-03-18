<script lang="ts">
	import { BoidComponent, VelocityComponent } from '../../components.svelte';
	import type { Entity } from '$lib/ecs/entity.svelte';
	import type { Updater } from '$lib/ecs/updater.svelte';

	let minSpeed = 5;
	let maxSpeed = 10;

	let { updater, entities } = $props<{ updater: Updater; entities: Set<Entity> }>();
	updater.add(() => {
		entities.forEach((entity) => {
			const isBoid = entity.has(BoidComponent);
			const velocity = entity.get(VelocityComponent);
			if (!velocity || !isBoid) return;
			const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
			if (speed < minSpeed) {
				velocity.x = (velocity.x / speed) * minSpeed;
				velocity.y = (velocity.y / speed) * minSpeed;
			} else if (speed > maxSpeed) {
				velocity.x = (velocity.x / speed) * maxSpeed;
				velocity.y = (velocity.y / speed) * maxSpeed;
			}
		});
	});
</script>

<slot />
