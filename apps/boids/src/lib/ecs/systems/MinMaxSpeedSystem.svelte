<script lang="ts">
	import { VelocityComponent } from '../components.svelte';
	import type { Entity } from '../entity.svelte';
	import type { Updater } from '../updater.svelte';

	let minSpeed = 5;
	let maxSpeed = 10;

	let { updater, entities } = $props<{ updater: Updater; entities: Set<Entity> }>();
	updater.add(() => {
		entities.forEach((entity) => {
			const velocity = entity.componentsByConstructor.get(VelocityComponent) as VelocityComponent | undefined;
			if (!velocity) return;
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
