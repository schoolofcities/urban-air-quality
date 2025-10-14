<script>
	let { 
        options = [], // array of {label, value} objects
        selectedValue = $bindable(), 
        onSelect = () => {}, 
        label = "Select an option:" 
    } = $props();
</script>

<div id="destext">
	<p style="margin-bottom: -5px;">
		{label}
	</p>
</div>

<div class="button-group" style="margin-top: 10px;">
	{#each options as option}
		<button
			class="toggle-button {selectedValue === option.value ? 'selected' : ''}"
			type="button"
			onclick={() => onSelect(option.value)}
		>
			{option.label}
		</button>
	{/each}
</div>

<style>
	.button-group {
		display: flex;
		margin-right: -10px;
	}

	.toggle-button {
		width: 100%;
		padding: 6px 12px;
		margin-right: 10px;
		border: 1px solid var(--brandGray);
		border-radius: 5px;
		cursor: pointer;
		font-size: 14px;
		opacity: 0.5;
		background-color: var(--brandWhite);
		color: var(--brandDarkGray);
		user-select: none;
		font-family: TradeGothicBold, sans-serif;
		font-size: 16px;
		font-weight: normal;
	}

	.toggle-button.selected {
		opacity: 1.0;
		border: 2px solid var(--brandLightBlue);
	}

	.toggle-button:hover {
		opacity: 1;
		transition: opacity 0.2s ease;
		border: 2px solid var(--brandMedBlue);
	}

	#destext {
		margin-bottom: 10px;
		margin-left: 0px;
	}

	#destext p {
		font-family: SourceSerif;
		font-size: 16px;
		line-height: 22px;
		font-weight: normal;
		color: var(--brandGray90);
	}
</style>
