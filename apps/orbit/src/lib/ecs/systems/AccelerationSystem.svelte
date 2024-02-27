<script lang="ts">
	import { dt } from "../../constants";
	import {
		AccelerationComponent,
		VelocityComponent,
	} from "../components.svelte";
	import type { Entity } from "../entity.svelte";
	import type { Updater } from "../updater.svelte";

	let { updater, entities } = $props<{
		updater: Updater;
		entities: Set<Entity>;
	}>();
	updater.add(() => {
		entities.forEach((entity) => {
			const velocity = entity.componentsByConstructor.get(
				VelocityComponent,
			) as VelocityComponent;
			const acceleration = entity.componentsByConstructor.get(
				AccelerationComponent,
			) as AccelerationComponent;
			if (!velocity || !acceleration) return;
			velocity.x += acceleration.x * dt;
			velocity.y += acceleration.y * dt;
			velocity.z += acceleration.z * dt;
		});
	});
</script>

<slot />
