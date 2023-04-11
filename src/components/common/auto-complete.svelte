<script lang="ts">
	// PROPS
	export let options: { value: string; name: string }[];
	export let value: string;
	export let callback: (value: string) => void;
	export let label = '';

	// STATE
	let showOptions = false;

	$: filteredOptions = options.filter((opt) =>
		opt.name.toLowerCase().includes(value.toLowerCase())
	);

	const handleChange = (
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		callback(event.currentTarget.value);
		showOptions = event.currentTarget.value.length > 1;
	};

	const handleClick = (opt: { value: string; name: string }) => {
		callback(opt.value);
		showOptions = false;
	};
</script>

<div class="relative">
	{#if label}
		<span>{label}</span>
	{/if}
	<input {value} on:input={handleChange} />
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
