<script lang="ts">
	import { BoidComponent, PositionComponent, VelocityComponent } from '../components.svelte';
	import type { Entity } from '$lib/ecs/entity.svelte';
	import type { Updater } from '$lib/ecs/updater.svelte';

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
			const position = entity.get(PositionComponent);
			const velocity = entity.get(VelocityComponent);
			const isBoid = entity.has(BoidComponent);
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
				if (!otherEntity.has(BoidComponent)) return;
				if (otherEntity == boid) return;
				const otherBoid = otherEntity;
				const otherPosition = otherBoid.get(PositionComponent);
				const otherVelocity = otherBoid.get(VelocityComponent);
				if (!otherPosition || !otherVelocity) return;
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
