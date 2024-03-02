<script lang="ts">
	import {
		BoidComponent,
		KillCountComponent,
		PositionComponent,
		EnemyComponent
	} from '../components.svelte';
	import type { Entity } from '../entity.svelte';
	import type { Updater } from '../updater.svelte';

	let { updater, entities } = $props<{
		updater: Updater;
		entities: Set<Entity>;
	}>();

	const killRange = 25;

	updater.add(() => {
		entities.forEach((entity) => {
			const isEnemy = entity.has(EnemyComponent);
			const position = entity.get(PositionComponent);
			const killCount = entity.get(KillCountComponent);
			if (!isEnemy || !position) return;
			entities.forEach((otherEntity) => {
				const otherBoidComponent = otherEntity.get(BoidComponent);
				if (!otherBoidComponent || otherEntity == entity) return;
				const otherPosition = otherEntity.get(PositionComponent);
				if (!otherPosition) return;
				const dx = position.x - otherPosition.x;
				const dy = position.y - otherPosition.y;

				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < killRange) {
					entities.delete(otherEntity);
					if (killCount) killCount.kills += 1;
				}
			});
		});
	});
</script>

<slot />
