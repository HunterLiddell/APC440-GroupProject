<!-- Generic button used for most actions. Contains two different types - default (filled) and outline (hollow with border) @component -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';

	interface IProps {
		/** Children to render in the button. */
		children: Snippet;
		/** Type of button style. 1. Default - filled | 2. Outline - hollow with border */
		type?: 'default' | 'outline';

		id?: 'for-cart' | '';
		/** Click handler derived from baked-in button click */
		onclick: MouseEventHandler<HTMLButtonElement> | null | undefined;
	}

	let { children, type = 'default', id = '', onclick }: IProps = $props();
</script>

<button {id} {onclick} class={type}>
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
