<script lang="ts">
	import { scale } from "../../constants";
	import type { Canvas } from "../canvas.svelte";
	import { MassComponent, PositionComponent } from "../components.svelte";
	import type { Entity } from "../entity.svelte";
	import type { Updater } from "../updater.svelte";

	let { canvas, updater, entities } = $props<{
		canvas: Canvas;
		updater: Updater;
		entities: Set<Entity>;
	}>();
	updater.add(() => {
		canvas.context.reset();
		entities.forEach((entity) => {
			const position = entity.componentsByConstructor.get(
				PositionComponent,
			) as PositionComponent;
			const mass = entity.componentsByConstructor.get(
				MassComponent,
			) as MassComponent;
			if (!position) return;
			const x = canvas.width / 2 + position.x * scale;
			const y = canvas.height / 2 + position.y * scale;
			canvas.context.lineCap = "round";
			canvas.context.beginPath();
			canvas.context.strokeStyle = "#FFF";
			canvas.context.lineWidth = 2;
			canvas.context.beginPath();
			canvas.context.arc(x, y, 2 + 4 * mass.mass, 0, 2 * Math.PI);
			canvas.context.stroke();
		});
	});
</script>

<slot />
