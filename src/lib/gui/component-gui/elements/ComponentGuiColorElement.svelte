<script lang="ts">
	let { name, value } = $props<{ name: string; value: string }>();
</script>

<div class="grid grid-cols-[auto_1fr_auto] gap-2 items-center max-h-8">
	<span class="mr-4">{name}</span>
	<span class="text-right">{value}</span>
	<input id="color" class="input" type="color" bind:value />
</div>
