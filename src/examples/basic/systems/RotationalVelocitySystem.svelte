<script lang="ts">
	import { RotationComponent, RotationalVelocityComponent } from '../components.svelte';
	import type { Entity } from '$lib/ecs/entity.svelte';
	import type { Updater } from '$lib/ecs/updater.svelte';

	let { updater, entities } = $props<{ updater: Updater; entities: Set<Entity> }>();
	updater.add(() => {
		entities.forEach((entity) => {
			const rotation = entity.get(RotationComponent);
			const velocity = entity.get(RotationalVelocityComponent);
			if (!rotation || !velocity) return;
			rotation.degrees += velocity.degreesPerFrame;
			rotation.degrees = rotation.degrees % 90;
		});
	});
</script>

<slot />
