<script lang="ts">
	import { BoidBiasComponent, BoidComponent, BoidScoutGroupComponent, PositionComponent, VelocityComponent } from '../components.svelte';
	import type { Entity } from '../entity.svelte';
	import type { Updater } from '../updater.svelte';

	const maxBias = 0.01;
	const biasIncrement = 0.001;

	let { updater, entities } = $props<{ updater: Updater; entities: Set<Entity> }>();
	updater.add(() => {
		entities.forEach((entity) => {
			const velocity = entity.componentsByConstructor.get(VelocityComponent) as VelocityComponent;
			const bias = entity.componentsByConstructor.get(BoidBiasComponent) as BoidBiasComponent;
			const scoutGroup = entity.componentsByConstructor.get(BoidScoutGroupComponent) as BoidScoutGroupComponent;
			const isBoid = entity.componentsByConstructor.has(BoidComponent);
			if (!velocity || !bias || !isBoid || !scoutGroup) return;

			if (scoutGroup.group == 1) {
				if (velocity.x > 0) bias.bias = Math.min(maxBias, bias.bias + biasIncrement);
				else bias.bias = Math.max(biasIncrement, bias.bias - biasIncrement);
			}
			if (scoutGroup.group == 2) {
				if (velocity.x < 0) bias.bias = Math.min(maxBias, bias.bias + biasIncrement);
				else bias.bias = Math.max(biasIncrement, bias.bias - biasIncrement);
			}
		});
	});
</script>

<slot />
