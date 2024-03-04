<script lang="ts">
	import { IsBouncingComponent, ScoreComponent } from '../components.svelte';
	import type { Entity } from '$lib/ecs/entity.svelte';
	import type { Updater } from '$lib/ecs/updater.svelte';

	let { updater, entities } = $props<{ updater: Updater; entities: Set<Entity> }>();

	updater.add(() => {
		entities.forEach((entity) => {
			const score = entity.get(ScoreComponent);
			const isBouncing = entity.has(IsBouncingComponent);
			if (!score) return;
			if (isBouncing) score.bounces += 1;
		});
	});
</script>

<slot />
