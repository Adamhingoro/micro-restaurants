<script>
	import MenuitemsAsync from './menuitemsAsync.svelte';
export let menus , restaurantId;

        console.log("RESTAURANT ID IN Menus " ,restaurantId);
</script>

{#if menus.length > 0}
     {#each menus as menu}
        <div class="single_menu">
            <div class="text-center">
            <h2 class="menu_name">{menu.name}</h2>
            <span class="menu_description">{menu.description}</span>
            </div>
            <MenuitemsAsync menuId={menu.id} restaurantId={restaurantId} />
        </div>
        <hr />
     {/each}
{:else}
     <h3>Sorry no menu on this restaurant.</h3>
{/if}

<style>
    .menu_name {
        color : #ff3e00;
        font-family: 'Open Sans';
        font-weight: 800;
        text-transform: uppercase;
        text-align: center;
        line-height: 0.4em;
        padding-top: 1em;
    }
    .menu_description{
        text-align: center;
        width: 100%;
        font-size: 16px;
        font-family: 'Open Sans';
        font-weight: bold;
    }
</style>