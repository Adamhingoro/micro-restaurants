<script>
    import { GetMenuById } from '../stores/menus.store.js';
    import { token } from "../stores/auth.store.js"
    export let id;
    let promise = GetMenuById($token , id);
</script>

{#await promise}
    <span>Loading...</span>
{:then menu}
    <span class="menu_name">{menu.name}</span>
{:catch error}
    <span>Error loading Menu</span>
{/await}

<style>
    .menu_name{
        font-weight: bold;
    }
</style>