<script lang="ts">
	let { name, value } = $props<{ name: string; value: string | number }>();
</script>

<div class="grid grid-cols-[auto_1fr]">
	<span>{name}</span>
	<span class="text-right">{value}</span>
</div>
