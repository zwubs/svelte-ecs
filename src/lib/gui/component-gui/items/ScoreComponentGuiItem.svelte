<script lang="ts">
	import ScoreIcon from 'virtual:icons/lucide/tally-5';
	import ComponentGuiItem from '../ComponentGuiItem.svelte';
	import type { ScoreComponent } from '../../../ecs/components.svelte';

	type Props = { score: ScoreComponent };
	let { score } = $props<Props>();
</script>

<ComponentGuiItem title="Score" icon={ScoreIcon}>
	<div class="grid grid-cols-[auto_1fr]">
		<span>Bounces</span>
		<span class="text-right">{score.bounces}</span>
	</div>
</ComponentGuiItem>
