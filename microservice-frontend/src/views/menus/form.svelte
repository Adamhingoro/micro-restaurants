<script>
	import { onMount } from 'svelte';
    import { GetAllrestaurants } from "../../stores/restaurants.store.js";
    import { GetMenuById , SaveMenu } from "../../stores/menus.store.js";

    import { user ,token } from "../../stores/auth.store.js";
    import { navigate } from "svelte-routing";
    export let id;

    let title = "Edit";

    if(id == "new"){
        title = "New";
    } 

    let menu;
    let restaurants;
    
    onMount(async () => {

        restaurants = await GetAllrestaurants($token);
        if(id != "new"){
            const promise = GetMenuById($token , id);
            menu = await promise;
        } else {
            menu = {
                name: '',
                description: '',
                restaurantId: $user.ownership,
            }
            if($user.ownership == 0){
                menu.restaurantId = restaurants[0].id;
            }
        }
    });
    
    const HandleSave = async () =>{
        let response = await SaveMenu($token , id , menu);
        if(response.status == 201){
            alert("Done");
            navigate("/admin/menus", { replace: true });
        }
    }
</script>


<div class="col col-md-4 offset-md-4">
    <div class="card">
        <div class="card-header">{title} Menu</div>
        <div class="card-body">
            {#if menu}
                <form>
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" bind:value={menu.name} class="form-control" iaria-describedby="emailHelp" placeholder="New-York Fried Chicken">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea type="text" bind:value={menu.description} class="form-control" aria-describedby="nameHelp" placeholder="MurphyCanyon Road"></textarea>
                    </div>
                    {#if $user.type == 1} 
                        {#if restaurants}
                            <div class="form-group">
                                <label for="inputname">restaurant</label>
                                <select type="text" bind:value={menu.restaurantId} class="form-control" aria-describedby="nameHelp" placeholder="Secret">
                                    {#each restaurants as item}
                                        <option value={item.id}> {item.name} </option>
                                    {/each}
                                </select>
                            </div>
                        {/if}
                    {/if}
                    <button type="button" on:click={HandleSave} class="btn btn-primary">Save</button>
                </form>
            {:else}
                <p>Loading Menu</p>
            {/if}
            
        </div>
    </div>
</div>