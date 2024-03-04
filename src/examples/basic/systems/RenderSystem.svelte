<script lang="ts">
	import type { Canvas } from '$lib/ecs/canvas.svelte';
	import {
		ColorComponent,
		PositionComponent,
		RotationComponent,
		SizeComponent
	} from '../components.svelte';
	import type { Entity } from '$lib/ecs/entity.svelte';
	import type { Updater } from '$lib/ecs/updater.svelte';

	let { canvas, updater, entities } = $props<{
		canvas: Canvas;
		updater: Updater;
		entities: Set<Entity>;
	}>();
	updater.add(() => {
		canvas.context.reset();
		entities.forEach((entity) => {
			const position = entity.get(PositionComponent);
			if (!position) return;
			const rotation = entity.get(RotationComponent);
			const color = entity.get(ColorComponent);
			const size = entity.get(SizeComponent);
			const width = size?.size ?? 50;
			const halfWidth = width / 2;
			canvas.context.lineCap = 'round';
			canvas.context.beginPath();
			canvas.context.fillStyle = color?.hex ?? '#BBB';
			canvas.context.strokeStyle = '#FFF';
			canvas.context.lineWidth = 2;
			canvas.context.translate(position.x ?? 0, position.y ?? 0);
			canvas.context.rotate(((rotation?.degrees ?? 0) * Math.PI) / 180);
			canvas.context.fillRect(-halfWidth, -halfWidth, width, width);
			canvas.context.rect(-halfWidth, -halfWidth, width, width);
			canvas.context.stroke();
			canvas.context.setTransform(1, 0, 0, 1, 0, 0);
		});
	});
</script>

<slot />
