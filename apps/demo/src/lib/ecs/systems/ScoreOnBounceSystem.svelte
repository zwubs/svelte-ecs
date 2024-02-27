<script lang="ts">
	import { IsBouncingComponent, ScoreComponent } from '../components.svelte';
	import type { Entity } from '../entity.svelte';
	import type { Updater } from '../updater.svelte';

	let { updater, entities } = $props<{ updater: Updater; entities: Set<Entity> }>();

	updater.add(() => {
		entities.forEach((entity) => {
			const score = entity.componentsByConstructor.get(ScoreComponent) as ScoreComponent;
			const isBouncing = entity.componentsByConstructor.has(IsBouncingComponent);
			if (!score) return;
			if (isBouncing) score.bounces += 1;
		});
	});
</script>

<slot />
