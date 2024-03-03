<script lang="ts">
	import { RotationComponent, RotationalVelocityComponent } from '../components.svelte';
	import type { Entity } from '../entity.svelte';
	import type { Updater } from '../updater.svelte';

	let { updater, entities } = $props<{ updater: Updater; entities: Set<Entity> }>();
	updater.add(() => {
		entities.forEach((entity) => {
			const rotation = entity.componentsByConstructor.get(RotationComponent) as RotationComponent;
			const velocity = entity.componentsByConstructor.get(RotationalVelocityComponent) as RotationalVelocityComponent;
			if (!rotation || !velocity) return;
			rotation.degrees += velocity.degreesPerFrame;
			rotation.degrees = rotation.degrees % 90;
		});
	});
</script>

<slot />
