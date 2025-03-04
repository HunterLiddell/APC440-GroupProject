<script lang="ts">
	import type { Snippet } from "svelte";
    import { ShoppingBag } from "lucide-svelte";
    import "../app.css"

    let {children}: {children: Snippet} = $props();

</script>


<header>
    <a href="/">
        <img style="height: 80px; border-radius: 100%" src="./logo.webp" alt="Logo">
    </a>
    <h1>Paws & Pastries</h1>

    <nav>
        <a href="/menu" >Menu</a>
        <a href='/bakers'>Meet the Bakers</a>
        <a href="/behind-the-scenes">Behind the Scenes</a>
    </nav>
    <button><ShoppingBag  size={32} /></button>
</header>

<main>
    {@render children()}
</main>


<footer>
    <p>&copy; 2025 Paws & Pastries Bakery - All Rights Reserved</p>
</footer>

<style lang="postcss">
    h1 {
        letter-spacing: 1px;
        margin-left: 32px;
    }

    header {
        display: flex;
        align-items: center;
        padding: 10px;
        height: fit-content;
        background-color: bisque;
        color: white;
        box-shadow: 0 0 12px gray;
    }
    main {
        padding: 40px;
    }

    .tagline {
        font-size: 1.5rem;
        margin-top: 10px;
        color: #A64B2A;
    }
    
    nav {
        margin-left: auto;
        margin-right: 12px;

        & a {
            margin: 0 12px;
        }
    }

    footer {
        margin-top: 40px;
        padding: 20px;
        background-color: #FF914D;
        color: white;
    }
</style>