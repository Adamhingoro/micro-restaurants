<script>
	import Cart from './../partialviews/cart.svelte';
</script>
<div class="row">
    <div class="col col-md-4 fixed_cart">
        <Cart checkout={true} />
    </div>
</div>

<style>
    .fixed_cart{
        margin:0px auto;
    }
</style>
