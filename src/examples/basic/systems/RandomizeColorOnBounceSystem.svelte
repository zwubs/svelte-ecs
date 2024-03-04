<script lang="ts">
	import {
		ColorComponent,
		IsBouncingComponent,
		RandomizeColorOnBounceComponent
	} from '../components.svelte';
	import type { Entity } from '$lib/ecs/entity.svelte';
	import type { Updater } from '$lib/ecs/updater.svelte';

	let { updater, entities } = $props<{ updater: Updater; entities: Set<Entity> }>();

	updater.add(() => {
		entities.forEach((entity) => {
			const color = entity.get(ColorComponent);
			const shouldRandomizeColorOnBounce = entity.has(RandomizeColorOnBounceComponent);
			const isBouncing = entity.has(IsBouncingComponent);
			if (!color) return;
			if (isBouncing && shouldRandomizeColorOnBounce)
				color.hex = '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');
		});
	});
</script>

<slot />
