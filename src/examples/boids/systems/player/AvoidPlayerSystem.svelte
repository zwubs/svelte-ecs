<script lang="ts">
	import { PositionComponent, VelocityComponent, PlayerComponent } from '../../components.svelte';
	import type { Entity } from '$lib/ecs/entity.svelte';
	import type { Updater } from '$lib/ecs/updater.svelte';

	const avoidenceRange = 300;
	let turnFactor = 0.5;

	let { updater, entities } = $props<{
		updater: Updater;
		entities: Set<Entity>;
	}>();
	updater.add(() => {
		entities.forEach((entity) => {
			const isPlayer = entity.has(PlayerComponent);
			const position = entity.get(PositionComponent);
			if (!isPlayer || !position) return;
			entities.forEach((otherEntity) => {
				if (otherEntity == entity) return;
				const otherPosition = otherEntity.get(PositionComponent);
				const otherVelocity = otherEntity.get(VelocityComponent);
				if (!otherPosition || !otherVelocity) return;

				const dx = position.x - otherPosition.x;
				const dy = position.y - otherPosition.y;

				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < avoidenceRange) {
					if (Math.sign(dx) > 0) otherVelocity.x -= turnFactor;
					else otherVelocity.x += turnFactor;
					if (Math.sign(dy) > 0) otherVelocity.y -= turnFactor;
					else otherVelocity.y += turnFactor;
				}
			});
		});
	});
</script>

<slot />
