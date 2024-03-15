<script lang="ts">
	type ComponentGuiSliderProps = {
		name: string;
		value: number;
		max?: number;
		min?: number;
		unit?: string;
	};
	let { name, value, max, min, unit } = $props<ComponentGuiSliderProps>();
</script>

<div class="grid grid-cols-[auto_1fr] gap-2 items-center max-h-8">
	<span>{name}</span>
	<span class="text-right text-xs">{value} / {max}{unit}</span>
</div>
<input type="range" bind:value {max} {min} />
