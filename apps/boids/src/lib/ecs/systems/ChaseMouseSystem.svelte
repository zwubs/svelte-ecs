<script lang="ts">
	import { PositionComponent, ChaseMouseComponent, VelocityComponent } from '../components.svelte';
	import type { Entity } from '../entity.svelte';
	import type { Updater } from '../updater.svelte';

	let { mouse, updater, entities } = $props<{
		mouse: { x: number; y: number };
		updater: Updater;
		entities: Set<Entity>;
	}>();

	updater.add(() => {
		entities.forEach((entity) => {
			const chaseMouse = entity.componentsByConstructor.get(
				ChaseMouseComponent
			) as ChaseMouseComponent;
			if (!chaseMouse) return;

			const position = entity.componentsByConstructor.get(PositionComponent) as PositionComponent;
			const velocity = entity.componentsByConstructor.get(VelocityComponent) as VelocityComponent;
			if (!position || !velocity) return;
			const dx = position.x - mouse.x;
			const dy = position.y - mouse.y;

			if (Math.sign(dx) > 0) velocity.x -= chaseMouse.bias;
			else velocity.x += chaseMouse.bias;
			if (Math.sign(dy) > 0) velocity.y -= chaseMouse.bias;
			else velocity.y += chaseMouse.bias;
		});
	});
</script>

<slot />
