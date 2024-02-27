<script lang="ts">
	import { BoidBiasComponent, BoidComponent, BoidScoutGroupComponent, PositionComponent, VelocityComponent } from '../components.svelte';
	import type { Entity } from '../entity.svelte';
	import type { Updater } from '../updater.svelte';

	let { updater, entities } = $props<{ updater: Updater; entities: Set<Entity> }>();
	updater.add(() => {
		entities.forEach((entity) => {
			const velocity = entity.componentsByConstructor.get(VelocityComponent) as VelocityComponent;
			const bias = entity.componentsByConstructor.get(BoidBiasComponent) as BoidBiasComponent;
			const scoutGroup = entity.componentsByConstructor.get(BoidScoutGroupComponent) as BoidScoutGroupComponent;
			const isBoid = entity.componentsByConstructor.has(BoidComponent);
			if (!velocity || !bias || !isBoid) return;

			if (scoutGroup.group == 1) {
				velocity.x = (1 - bias.bias) * velocity.x + bias.bias;
			}
			if (scoutGroup.group == 2) {
				velocity.x = (1 - bias.bias) * velocity.x - bias.bias;
			}
		});
	});
</script>

<slot />
