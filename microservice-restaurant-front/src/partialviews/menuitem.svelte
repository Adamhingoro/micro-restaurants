<script>
    import { AddOrderItem } from "../stores/orders.store.js";
    export let item, restaurantId;

    const AddtoCart = async () => {
        console.log("RESTAURANT ID IN MENUITEM " ,restaurantId);
        AddOrderItem( item.id , 1 , item , restaurantId);
    }
</script>
<div class="col col-xs-12 col-sm-12 col-md-4">
    <div>
        {#if item.imageURL}
             <img src={item.imageURL} class="item_image" alt="Food item image"/>
        {:else}
             <img class="item_image" src="https://via.placeholder.com/200x150?text=Visit+Blogging.com+Now" alt="Food item image"/>
        {/if}
    </div>
    <div class="item_details">
        <h4 class="item_name">{item.name}</h4>
        <span class="item_description">{item.description}</span>
        <button on:click={AddtoCart} class="item_price">${item.price}</button>
    </div>
</div>

<style>
    .item_price{
        position: absolute;
        bottom:10px;
        right:24px;
        font-size: 2em;
        padding: 5px;
        line-height: 26px;
        font-weight: bold;
        background-color: #ff3e00;
        color:white;
        border-radius: 1em;
    }
    .item_image{
        width: 100%;
        height: 200px;
        border: 1px solid #fbbca8;
        border-bottom: none;
    }
    .item_name{
        color: #ff3e00;
        font-family: 'Open Sans';
        font-weight: 800;
        text-transform: uppercase;
        margin-bottom: 0;
    }
    .item_description{
        font-family: 'Open Sans';
        font-weight: 400;

    }
    .item_details{
        padding-left: 10px;
        padding-right: 10px;
        border: 1px solid #fbbca8;
        border-top: none;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        height: 130px;
    }
</style>