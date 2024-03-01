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
		canvas.context.fillStyle = 'rgba(36, 44, 70, 0.5)';
		canvas.context.fillRect(0, 0, canvas.width, canvas.height);
		entities.forEach((entity) => {
			const position = entity.componentsByConstructor.get(PositionComponent) as PositionComponent;
			const group = entity.componentsByConstructor.get(BoidScoutGroupComponent) as
				| BoidScoutGroupComponent
				| undefined;
			const hasTracking = entity.componentsByConstructor.has(TrackMouseComponent);
			if (!position || hasTracking) return;
			canvas.context.lineCap = 'round';
			canvas.context.beginPath();
			canvas.context.strokeStyle = '#FFF';
			canvas.context.lineWidth = 2;
			canvas.context.beginPath();
			canvas.context.arc(position.x, position.y, 2, 0, 2 * Math.PI);
			canvas.context.stroke();
		});
	});
</script>

<slot />
