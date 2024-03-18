<script lang="ts">
	import { BoidComponent, ChirpComponent } from '../../components.svelte';
	import type { Entity } from '$lib/ecs/entity.svelte';
	import type { Updater } from '$lib/ecs/updater.svelte';
	import { Howl } from 'howler';
	import ChirpsSoundEffect from '../../assets/sounds/chirps.ogg';

	var sound = new Howl({
		src: [ChirpsSoundEffect],
		sprite: {
			1: [0, 213],
			2: [213, 213],
			3: [426, 213],
			4: [639, 213]
		}
	});

	sound.play();

	let { updater, entities } = $props<{
		updater: Updater;
		entities: Set<Entity>;
	}>();

	updater.add(() => {
		entities.forEach((entity) => {
			const isBoid = entity.has(BoidComponent);
			const chirp = entity.get(ChirpComponent);
			if (!isBoid || !chirp) return;
			if (chirp.counter > 0) {
				chirp.counter -= 1;
				return;
			}
			// sound.duration
			// sound.play(Math.floor(Math.random() * ));
		});
	});
</script>

<slot />
