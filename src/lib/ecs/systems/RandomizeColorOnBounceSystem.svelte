<script lang="ts">
	import { ColorComponent, IsBouncingComponent, ScoreComponent, RandomizeColorOnBounceComponent } from '../components.svelte';
	import type { Entity } from '../entity.svelte';
	import type { Updater } from '../updater.svelte';

	let { updater, entities } = $props<{ updater: Updater; entities: Set<Entity> }>();

	updater.add(() => {
		entities.forEach((entity) => {
			const color = entity.componentsByConstructor.get(ColorComponent) as ColorComponent;
			const shouldRandomizeColorOnBounce = entity.componentsByConstructor.has(RandomizeColorOnBounceComponent);
			const isBouncing = entity.componentsByConstructor.has(IsBouncingComponent);
			if (!color) return;
			if (isBouncing && shouldRandomizeColorOnBounce) color.hex = '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');
		});
	});
</script>

<slot />
