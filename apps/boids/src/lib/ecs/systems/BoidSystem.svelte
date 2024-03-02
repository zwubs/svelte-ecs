<script lang="ts">
	import { BoidComponent, PositionComponent, VelocityComponent } from '../components.svelte';
	import type { Entity } from '../entity.svelte';
	import type { Updater } from '../updater.svelte';

	const visualRange = 90;
	const visualRangeSquared = Math.pow(visualRange, 2);
	const protectedRange = 30;
	const protectedRangeSquared = Math.pow(protectedRange, 2);

	const centeringFactor = 0.0005;
	const avoidingFactor = 0.005;
	const matchingFactor = 0.01;

	let { updater, entities } = $props<{ updater: Updater; entities: Set<Entity> }>();
	updater.add(() => {
		entities.forEach((entity) => {
			const position = entity.componentsByConstructor.get(PositionComponent) as PositionComponent;
			const velocity = entity.componentsByConstructor.get(VelocityComponent) as VelocityComponent;
			const isBoid = entity.componentsByConstructor.has(BoidComponent);
			if (!position || !velocity || !isBoid) return;
			const boid = entity;
			let closeDx = 0,
				closeDy = 0,
				xPosAvg = 0,
				yPosAvg = 0,
				xVelAvg = 0,
				yVelAvg = 0,
				neighboringBoids = 0;
			entities.forEach((otherEntity) => {
				if (!otherEntity.componentsByConstructor.has(BoidComponent)) return;
				if (otherEntity == boid) return;
				const otherBoid = otherEntity;
				const otherPosition = otherBoid.componentsByConstructor.get(
					PositionComponent
				) as PositionComponent;
				const otherVelocity = otherBoid.componentsByConstructor.get(
					VelocityComponent
				) as VelocityComponent;
				const dx = position.x - otherPosition.x;
				const dy = position.y - otherPosition.y;

				if (Math.abs(dx) < visualRange && Math.abs(dy) < visualRange) {
					const squaredDistance = dx * dx + dy * dy;
					if (squaredDistance < protectedRangeSquared) {
						closeDx += position.x - otherPosition.x;
						closeDy += position.y - otherPosition.y;
					} else if (squaredDistance < visualRangeSquared) {
						xPosAvg += otherPosition.x;
						yPosAvg += otherPosition.y;
						xVelAvg += otherVelocity.x;
						yVelAvg += otherVelocity.y;
						neighboringBoids += 1;
					}
				}
			});

			if (neighboringBoids > 0) {
				xPosAvg /= neighboringBoids;
				yPosAvg /= neighboringBoids;
				xVelAvg /= neighboringBoids;
				yVelAvg /= neighboringBoids;

				velocity.x +=
					(xPosAvg - position.x) * centeringFactor + (xVelAvg - velocity.x) * matchingFactor;
				velocity.y +=
					(yPosAvg - position.y) * centeringFactor + (yVelAvg - velocity.y) * matchingFactor;
			}
			velocity.x += closeDx * avoidingFactor;
			velocity.y += closeDy * avoidingFactor;
		});
	});
</script>

<slot />
