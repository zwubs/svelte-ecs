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
	const avoidenceRangeSquared = Math.pow(avoidenceRange, 2);
	let turnFactor = 0.5;

	let { updater, entities } = $props<{
		updater: Updater;
		entities: Set<Entity>;
	}>();
	updater.add(() => {
		entities.forEach((entity) => {
			const isEnemey = entity.componentsByConstructor.has(EnemyComponent);
			const position = entity.componentsByConstructor.get(PositionComponent) as PositionComponent;
			if (!isEnemey || !position) return;
			entities.forEach((otherEntity) => {
				if (otherEntity == entity) return;
				const otherPosition = otherEntity.componentsByConstructor.get(
					PositionComponent
				) as PositionComponent;
				const otherVelocity = otherEntity.componentsByConstructor.get(
					VelocityComponent
				) as VelocityComponent;
				const otherIsEnemy = otherEntity.componentsByConstructor.has(EnemyComponent);

				const dx = position.x - otherPosition.x;
				const dy = position.y - otherPosition.y;

				const squaredDistance = dx * dx + dy * dy;

				if (squaredDistance < (otherIsEnemy ? avoidenceRangeSquared / 5 : avoidenceRangeSquared)) {
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
