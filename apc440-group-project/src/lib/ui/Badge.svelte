<script lang="ts">
	interface IProps {
		color: 'red' | 'blue' | 'green';
		title: string;
	}

	let { color, title }: IProps = $props();
</script>

<span class={color}>
	{title}
</span>

<style lang="postcss">
	span {
		width: fit-content;
		height: fit-content;
		padding: 0.25rem 0.5rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 600;
		border-radius: 20px;

		&.red {
			background-color: #fee2e2;
			color: #991b1b;
		}

		&.green {
			background-color: #dcfce7;
			color: #166534;
		}

		&.blue {
			background-color: #dbeafe;
			color: #1e40af;
		}
	}
</style>
