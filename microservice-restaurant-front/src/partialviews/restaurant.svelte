<script>
    export let restaurant , pill;
    import { navigate } from "svelte-routing";
    const OpenMenu = () =>{
        navigate(`/front/restaurant/${restaurant.id}`, { replace: true });
    }
</script>
<div class="col col-md-12 main_box">
    <div class="row">
        <div class="col col-md-4">
            {#if restaurant.imageURL}
                <img class="img-rounded img-responsive"  src="{restaurant.imageURL}" alt="{restaurant.name}" >
            {:else}
                <img class="img-rounded img-responsive"  src="http://placehold.it/350x250" alt="{restaurant.name}" >
            {/if}
        </div>
        <div class="col col-md-8">
            <h1 class="restaurant_name">{restaurant.name}</h1>
            <h5><i class="fa fa-map-marker" aria-hidden="true"></i> {restaurant.address} ,{restaurant.city},  {restaurant.state}</h5>
            <h5><i class="fa fa-globe" aria-hidden="true"></i> {restaurant.cuisine} cuisine</h5>
            {#if pill == true}  
                <button on:click={OpenMenu} class="btn pull-right btn-danger view_menu">View Menu</button>
            {/if}
        </div>
    </div>
</div>

<style>
    .img-responsive{
        width: 100%;
        max-width: 100%;
    }
    *{
        font-family: 'Open Sans', sans-serif;
    }
    .main_box{
        border: 1px solid #e0e0e0;
        border-radius: 20px;
        padding: 10px;
        margin-top: 14px;
    }
    .img-rounded {
        border-radius: 20px;
    }
    .restaurant_name {
        color : #ff3e00;
        font-family: 'Open Sans';
        font-weight: 800;
        text-transform: uppercase;
    }
    .view_menu{
        position: absolute;
        bottom: 0;
        right: 15px;
    }
</style>