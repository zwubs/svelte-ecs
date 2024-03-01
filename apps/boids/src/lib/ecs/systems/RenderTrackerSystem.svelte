<script lang="ts">
	import type { Canvas } from '../canvas.svelte';
	import {
		BoidScoutGroupComponent,
		PositionComponent,
		TrackMouseComponent
	} from '../components.svelte';
	import type { Entity } from '../entity.svelte';
	import type { Updater } from '../updater.svelte';

	let { canvas, updater, entities } = $props<{
		canvas: Canvas;
		updater: Updater;
		entities: Set<Entity>;
	}>();
	updater.add(() => {
		entities.forEach((entity) => {
			const position = entity.componentsByConstructor.get(PositionComponent) as PositionComponent;
			const hasTracking = entity.componentsByConstructor.has(TrackMouseComponent);
			if (!position || !hasTracking) return;
			canvas.context.lineCap = 'round';
			canvas.context.beginPath();
			canvas.context.strokeStyle = '#F44';
			canvas.context.lineWidth = 2;
			canvas.context.beginPath();
			canvas.context.arc(position.x, position.y, 10, 0, 2 * Math.PI);
			canvas.context.stroke();
		});
	});
</script>

<slot />
