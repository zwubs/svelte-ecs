<script lang="ts">
	import { dt } from "../../constants";
	import { PositionComponent, VelocityComponent } from "../components.svelte";
	import type { Entity } from "../entity.svelte";
	import type { Updater } from "../updater.svelte";

	let { updater, entities } = $props<{
		updater: Updater;
		entities: Set<Entity>;
	}>();
	updater.add(() => {
		entities.forEach((entity) => {
			const position = entity.componentsByConstructor.get(
				PositionComponent,
			) as PositionComponent;
			const velocity = entity.componentsByConstructor.get(
				VelocityComponent,
			) as VelocityComponent;
			if (!position || !velocity) return;
			position.x += velocity.x * dt;
			position.y += velocity.y * dt;
			position.z += velocity.z * dt;
		});
	});
</script>

<slot />
