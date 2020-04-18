<script>
    import { GetAllMenuItemsByMenu } from '../stores/menuitems.store.js';
    import MenuItemView from "./menuitem.svelte";
    export let menuId , restaurantId;
    let promise = GetAllMenuItemsByMenu( menuId );
        console.log("RESTAURANT ID IN MENUsITEM ACYNC " ,restaurantId);
</script>

{#await promise}
    <span>Loading...</span>
{:then menuItems}
    <div class="row">
        {#each menuItems as item}
            <MenuItemView item={item} restaurantId={restaurantId} />
        {/each}
    </div>
{:catch error}
    <span>Error loading Items</span>
{/await}