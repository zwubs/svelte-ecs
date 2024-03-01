<script lang="ts">
	import type { Canvas } from '../canvas.svelte';
	import {
		BoidScoutGroupComponent,
		PositionComponent,
		TrackMouseComponent
	} from '../components.svelte';
	import type { Entity } from '../entity.svelte';
	import type { Updater } from '../updater.svelte';

	let { mouse, updater, entities } = $props<{
		mouse: { x: number; y: number };
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
			position.x = mouse.x;
			position.y = mouse.y;
		});
	});
</script>

<slot />
