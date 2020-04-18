<script>
	import Cart from './../partialviews/cart.svelte';
	import MenusAsync from './../partialviews/menusAsync.svelte';
    import RestaurantAsync from './../partialviews/restaurantAsync.svelte';
    export let id;
</script>
<div class="row">
    <div class="col col-md-8">
        <RestaurantAsync id={id} />
        <MenusAsync restaurantId={id} />
    </div>
    <div class="col col-md-4 fixed_cart">
        <Cart restaurantId={id} />
    </div>
</div>

<style>
    .fixed_cart{
        position: fixed;
        right: 10px;
    }
</style>
