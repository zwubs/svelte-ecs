<script lang="ts">
	import {
		BoidComponent,
		PositionComponent,
		ChaseMouseComponent,
		VelocityComponent,
		EnemyComponent
	} from '../components.svelte';
	import type { Entity } from '../entity.svelte';
	import type { Updater } from '../updater.svelte';

	const avoidenceRange = 300;
	let turnFactor = 0.5;

	let { updater, entities } = $props<{
		updater: Updater;
		entities: Set<Entity>;
	}>();
	updater.add(() => {
		entities.forEach((entity) => {
			const isEnemey = entity.has(EnemyComponent);
			const position = entity.get(PositionComponent);
			if (!isEnemey || !position) return;
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
