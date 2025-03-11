<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';

	interface IProps {
		children: Snippet;
		class: string;
		type?: 'default' | 'outline';
		onclick: MouseEventHandler<HTMLButtonElement> | null | undefined;
	}

	let { children, class: customClass, onclick }: IProps = $props();
</script>

<button {onclick} data-variant={customClass} class={customClass}>
	{@render children()}
</button>

<style lang="postcss">
	button {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 16px;
		border-radius: 6px;
		font-size: 16px;
		font-weight: 500;
		transition: all 0.2s ease-in-out;

		&.default {
			background-color: #ff6b6b;
			color: white;
			border: 2px transparent solid;

			&:hover {
				background-color: #ff4c4c;
			}
		}

		&.outline {
			background-color: transparent;
			color: #ff6b6b;
			border: 2px solid #ff6b6b;

			&:hover {
				background-color: #ff6b6b;
				color: white;
			}
		}
	}
</style>
