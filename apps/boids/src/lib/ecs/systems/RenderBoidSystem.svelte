<script lang="ts">
	import type { Canvas } from '../canvas.svelte';
	import {
		BoidComponent,
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
			const isBoid = entity.componentsByConstructor.has(BoidComponent);
			if (!position || !isBoid) return;
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
