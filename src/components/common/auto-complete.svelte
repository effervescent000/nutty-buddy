<script lang="ts">
	// PROPS
	export let options: { value: number; name: string }[];
	export let value: string;
	export let callback: ({
		value,
		name
	}: {
		value?: number;
		name: string;
	}) => void;
	export let label = '';
	export let testid = '';

	// STATE
	let showOptions = false;

	$: filteredOptions = options.filter((opt) =>
		opt.name.toLowerCase().includes(value.toLowerCase())
	);

	// LOGIC
	const handleChange = (
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		callback({ name: value });
		showOptions = event.currentTarget.value.length > 1;
	};

	const handleClick = (opt: { value: number; name: string }) => {
		callback(opt);
		showOptions = false;
	};
</script>

<div class="relative">
	{#if label}
		<span>{label}</span>
	{/if}
	<input
		{value}
		class="bg-off-white rounded-sm border border-green"
		data-testid={testid}
		on:input={handleChange}
	/>
	{#if showOptions}
		<ul class="absolute">
			{#each filteredOptions as opt}
				<li
					on:click={() => handleClick(opt)}
					on:keypress={() => handleClick(opt)}
				>
					{opt.name}
				</li>
			{/each}
		</ul>
	{/if}
</div>
