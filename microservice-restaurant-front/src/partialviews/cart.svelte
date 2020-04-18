<script>
	import Restaurant from './restaurant.svelte';
	import CustomerForm from './customerForm.svelte';
	import { navigate } from 'svelte-routing';
	import Cartitem from './cartitem.svelte';
    import { order , orderrestaurant } from "../stores/orders.store.js";
    import { onMount } from "svelte";
    let CurrentOrder;
    let Total = 0;

    export let checkout = false, restaurantId;


    order.subscribe( (x) => {
        CurrentOrder = x;
        if(CurrentOrder.length > 0)
        {
            Total = CurrentOrder.reduce( (x , y ) => {
                return x + (y.menuItem.price * y.quantity);
            } , 0);
        }
    });

    if(checkout === false){
        onMount(async () => {
            if($orderrestaurant === restaurantId){
                console.log("We will load previous orders");
            } else {
                alert("Your previous order has been cleared for this restaurant")
                order.set([]);
                console.log("Order will be cleared");
            }
        });
    }

    const CheckoutPage = () => {
        navigate(`/front/checkout`, { replace: true });
    }
</script>
<div>
    <h1 class="heading">YOUR ORDER</h1>
</div>
<div>
    {#if CurrentOrder.length > 0}
        <div>
            {#each CurrentOrder as OrderItem}
                <Cartitem item={OrderItem} />
            {/each}
            <div class="pull-right ">
                <h3 class="total_amount">Total ${Total}</h3>
            </div>
        </div>
        {#if !checkout}
            <div>
                <button on:click={CheckoutPage} class="btn btn-danger btn-block checkout">CHECKOUT</button>
            </div>
        {:else}
            <CustomerForm />
        {/if}
    {:else}
        <img class="waiter_img" src="https://www.pngrepo.com/download/106540/waiter.png"  alt="waiting for orders"/>
        <h3 class="waiting_for_orders">Waiting for your orders.</h3>
    {/if}
</div>

<style>

    .checkout {
        background-color : #ff3e00;
        color:white;
        font-size: 2em;
        font-family: 'Open Sans';
        font-weight: 800;
        text-transform: uppercase;
    }
    .heading {
        color : #ff3e00;
        font-family: 'Open Sans';
        font-weight: 800;
        text-transform: uppercase;
        text-align: center;
    }
    .total_amount {
        color : #ff3e00;
        font-family: 'Open Sans';
        font-weight: 800;
        text-transform: uppercase;
    }
     .waiting_for_orders {
        font-family: 'Open Sans';
        font-weight: 800;
        text-transform: uppercase;
        text-align: center;
    }
    .waiter_img{
        width:50%;
        margin: 0px auto;
        display: block;
    }
</style>