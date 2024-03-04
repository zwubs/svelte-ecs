<script lang="ts">
	import { dt } from '../constants';
	import { PositionComponent, VelocityComponent } from '../components.svelte';
	import type { Entity } from '$lib/ecs/entity.svelte';
	import type { Updater } from '$lib/ecs/updater.svelte';

	let { updater, entities } = $props<{
		updater: Updater;
		entities: Set<Entity>;
	}>();
	updater.add(() => {
		entities.forEach((entity) => {
			const position = entity.get(PositionComponent);
			const velocity = entity.get(VelocityComponent);
			if (!position || !velocity) return;
			position.x += velocity.x * dt;
			position.y += velocity.y * dt;
			position.z += velocity.z * dt;
		});
	});
</script>

<slot />
