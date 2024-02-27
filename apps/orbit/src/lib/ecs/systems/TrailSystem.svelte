<script lang="ts">
	import { scale } from "../../constants";
	import type { Canvas } from "../canvas.svelte";
	import {
		MassComponent,
		PerviousPositionsComponent,
		PositionComponent,
	} from "../components.svelte";
	import type { Entity } from "../entity.svelte";
	import type { Updater } from "../updater.svelte";

	let { canvas, updater, entities } = $props<{
		canvas: Canvas;
		updater: Updater;
		entities: Set<Entity>;
	}>();
	updater.add(() => {
		entities.forEach((entity) => {
			const previousPositions = entity.componentsByConstructor.get(
				PerviousPositionsComponent,
			) as PerviousPositionsComponent;
			if (!previousPositions) return;

			const currentPosition = entity.componentsByConstructor.get(
				PositionComponent,
			) as PositionComponent;
			if (!currentPosition) return;

			canvas.context.lineWidth = 1;
			previousPositions.positions.forEach((position, index) => {
				const x = canvas.width / 2 + position.x * scale;
				const y = canvas.height / 2 + position.y * scale;
				const nextPosition =
					previousPositions.positions[index + 1] ?? currentPosition;
				const nextX = canvas.width / 2 + nextPosition.x * scale;
				const nextY = canvas.height / 2 + nextPosition.y * scale;
				const alpha = index / previousPositions.max;
				canvas.context.strokeStyle = `rgba(255,255,255,${alpha})`;
				canvas.context.beginPath();
				canvas.context.moveTo(x, y);
				canvas.context.lineTo(nextX, nextY);
				canvas.context.stroke();
				canvas.context.closePath();
			});

			previousPositions.add(currentPosition);
		});
	});
</script>

<slot />
