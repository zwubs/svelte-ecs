<script lang="ts">
	import {
		BoidComponent,
		PositionComponent,
		TrackMouseComponent,
		VelocityComponent
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
			const shouldTrackMouse = entity.componentsByConstructor.has(
				TrackMouseComponent
			) as TrackMouseComponent;
			const position = entity.componentsByConstructor.get(PositionComponent) as PositionComponent;
			if (!shouldTrackMouse || !position) return;
			entities.forEach((otherEntity) => {
				if (!otherEntity.componentsByConstructor.has(BoidComponent)) return;
				if (otherEntity == entity) return;
				const otherBoid = otherEntity;
				const otherPosition = otherBoid.componentsByConstructor.get(
					PositionComponent
				) as PositionComponent;
				const otherVelocity = otherBoid.componentsByConstructor.get(
					VelocityComponent
				) as VelocityComponent;
				const dx = position.x - otherPosition.x;
				const dy = position.y - otherPosition.y;

				const squaredDistance = dx * dx + dy * dy;

				if (squaredDistance < avoidenceRangeSquared) {
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
