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
		callback({ name: event.currentTarget.value });
		showOptions = event.currentTarget.value.length > 1;
	};

	const handleClick = (opt: { value: number; name: string }) => {
		callback(opt);
		showOptions = false;
	};
</script>

<div class="flex">
	{#if label}
		<span>{label}</span>
	{/if}
	<div class="relative">
		<input
			{value}
			class="bg-off-white rounded-sm border border-green"
			data-testid={testid}
			on:input={handleChange}
			on:blur={() => (showOptions = false)}
		/>
		{#if showOptions}
			<ul
				class="absolute z-10 bg-off-white border border-green text-purple"
				data-testid="auto-complete-popout"
			>
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
</div>
