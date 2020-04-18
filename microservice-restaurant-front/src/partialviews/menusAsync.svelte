<script>
    import { GetAllMenusByRestaurant } from '../stores/menus.store.js';
    import MenusView from "./menus.svelte";
    export let restaurantId;
    let promise = GetAllMenusByRestaurant( restaurantId );

        console.log("RESTAURANT ID IN MENUS ASYNC " ,restaurantId);
</script>

{#await promise}
    <span>Loading...</span>
{:then menus}
    <MenusView menus={menus} restaurantId={restaurantId} />
{:catch error}
    <span>Error loading menus</span>
{/await}