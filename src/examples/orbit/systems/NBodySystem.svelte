<script lang="ts">
	import { g, softeningConstant } from '../constants';
	import { AccelerationComponent, MassComponent, PositionComponent } from '../components.svelte';
	import type { Entity } from '$lib/ecs/entity.svelte';
	import type { Updater } from '$lib/ecs/updater.svelte';

	let { updater, entities } = $props<{
		updater: Updater;
		entities: Set<Entity>;
	}>();

	updater.add(() => {
		entities.forEach((entity) => {
			const position = entity.get(PositionComponent);
			const acceleration = entity.get(AccelerationComponent);
			const mass = entity.get(MassComponent);
			if (!position || !acceleration || !mass) return;
			acceleration.x = 0;
			acceleration.y = 0;
			acceleration.z = 0;
			entities.forEach((otherEntity) => {
				if (entity == otherEntity) return;
				const otherPosition = otherEntity.get(PositionComponent);
				const otherMass = otherEntity.get(MassComponent);
				if (!otherPosition || !otherMass) return;
				const dx = otherPosition.x - position.x;
				const dy = otherPosition.y - position.y;
				const dz = otherPosition.z - position.z;

				const distSq = dx * dx + dy * dy + dz * dz;
				const f = (g * otherMass.mass) / (distSq * Math.sqrt(distSq + softeningConstant));

				acceleration.x += dx * f;
				acceleration.y += dy * f;
				acceleration.z += dz * f;
			});
		});
	});
</script>

<slot />
