<script lang="ts">
	// PROPS
	export let initialValue: { name: string; id: number } | undefined = undefined;
	export let options: { id: number; name: string }[];
	export let label: string;
	export let testid = '';
	export let nameName: string;
	export let idName: string;

	// STATE
	let showOptions = false;
	let idValue: number | undefined = initialValue?.id;
	let nameValue = initialValue?.name || '';

	$: filteredOptions = options.filter((opt) =>
		opt.name.toLowerCase().includes(nameValue.toLowerCase())
	);

	// LOGIC
	const handleChange = (
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		nameValue = event.currentTarget.value;
		showOptions = event.currentTarget.value.length > 1;
	};

	const handleClick = (opt: { id: number; name: string }) => {
		nameValue = opt.name;
		idValue = opt.id;
		showOptions = false;
	};
</script>

<div class="flex gap-2">
	{#if label}
		<span>{label}</span>
	{/if}
	<div class="relative">
		<input
			name={nameName}
			value={nameValue}
			class="bg-off-white rounded-sm border border-green w-[15rem]"
			data-testid={testid}
			on:input={handleChange}
			on:blur={() => setTimeout(() => (showOptions = false), 250)}
			autocomplete="off"
		/>
		<input type="hidden" name={idName} bind:value={idValue} />
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
