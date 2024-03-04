<script lang="ts">
	import { dt } from '../constants';
	import { AccelerationComponent, VelocityComponent } from '../components.svelte';
	import type { Entity } from '$lib/ecs/entity.svelte';
	import type { Updater } from '$lib/ecs/updater.svelte';

	let { updater, entities } = $props<{
		updater: Updater;
		entities: Set<Entity>;
	}>();
	updater.add(() => {
		entities.forEach((entity) => {
			const velocity = entity.get(VelocityComponent);
			const acceleration = entity.get(AccelerationComponent);
			if (!velocity || !acceleration) return;
			velocity.x += acceleration.x * dt;
			velocity.y += acceleration.y * dt;
			velocity.z += acceleration.z * dt;
		});
	});
</script>

<slot />
