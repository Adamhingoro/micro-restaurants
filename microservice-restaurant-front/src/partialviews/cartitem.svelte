<script>
	import MenuitemnameAsync from './menuitemnameAsync.svelte';
    import { GetMenuItemById } from '../stores/menuitems.store.js';
    import { AddOrderItem , RemoveOrderItem } from "../stores/orders.store.js";
    export let item, restaurantId;


    const AddOne = () => {
        AddOrderItem(item.menuItem.id , 1 , item.menuItem ,restaurantId);
    }
    const RemoveOne = () => {
        RemoveOrderItem(item.menuItem.id , 1 , item.menuItem ,restaurantId);
    }
</script>
<div class="row">
    <div class="col col-md-5 item_name">
        {item.menuItem.name}
    </div>
    <div  class="col col-md-1 text-center">
        <button on:click={RemoveOne} class="btn btn-sm btn-danger"><i class="fa fa-minus" aria-hidden="true"></i></button>
    </div>
    <div class="col col-md-1 text-center"> 
        {item.quantity}
    </div>
    <div  class="col col-md-1 text-center">
        <button on:click={AddOne} class="btn btn-sm btn-danger"><i class="fa fa-plus" aria-hidden="true"></i></button>
    </div>
    <div  class="col col-md-1 text-center">
        X
    </div>
    <div  class="col col-md-1 text-center">
        ${item.menuItem.price}
    </div>
    <div  class="col col-md-1 text-center">
        =
    </div>
    <div  class="col col-md-1 item_name  text-center">
        ${item.menuItem.price * item.quantity}
    </div>
</div>
<hr />

<style>
    .item_name{
        font-size: 1em;
        font-weight: 700;
        font-family: "Open Sans";
        text-transform: uppercase;
    }
    .btn-danger{
        padding: 0px 5px;
    }
</style>
