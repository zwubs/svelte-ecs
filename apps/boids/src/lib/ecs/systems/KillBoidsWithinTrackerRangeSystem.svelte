<script lang="ts">
	import {
		BoidComponent,
		KillCountComponent,
		PositionComponent,
		TrackMouseComponent
	} from '../components.svelte';
	import type { Entity } from '../entity.svelte';
	import type { Updater } from '../updater.svelte';

	let { updater, entities } = $props<{
		updater: Updater;
		entities: Set<Entity>;
	}>();

	const killRange = 25;
	const killRangeSquared = Math.pow(killRange, 2);

	updater.add(() => {
		entities.forEach((entity) => {
			const shouldTrackMouse = entity.componentsByConstructor.has(
				TrackMouseComponent
			) as TrackMouseComponent;
			const position = entity.componentsByConstructor.get(PositionComponent) as PositionComponent;
			const killCount = entity.componentsByConstructor.get(KillCountComponent) as
				| KillCountComponent
				| undefined;
			if (!shouldTrackMouse || !position) return;
			entities.forEach((otherEntity) => {
				const otherBoidComponent = otherEntity.componentsByConstructor.get(BoidComponent);
				if (!otherBoidComponent || otherEntity == entity) return;
				const otherPosition = otherEntity.componentsByConstructor.get(
					PositionComponent
				) as PositionComponent;
				const dx = position.x - otherPosition.x;
				const dy = position.y - otherPosition.y;

				const squaredDistance = dx * dx + dy * dy;

				if (squaredDistance < killRangeSquared) {
					entities.delete(otherEntity);
					if (killCount) killCount.kills += 1;
				}
			});
		});
	});
</script>

<slot />
