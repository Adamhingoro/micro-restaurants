<script>
	import { onMount } from 'svelte';
    import { GetrestaurantById , Saverestaurant , GetRestaurantImagePUTURL } from "../../stores/restaurants.store.js";
    import { token , putImageToAWS } from "../../stores/auth.store.js";
    import { navigate } from "svelte-routing";
    export let id;

    let title = "Edit";

    if(id == "new"){
        title = "New";
    } 

    let restaurant;
    let files;
    
    onMount(async () => {
        if(id != "new"){
            const promise = GetrestaurantById($token , id);
            restaurant = await promise;
        } else {
            restaurant = {
                name: '',
                address: '',
                city:'',
                country:'',
                state:'',
                cuisine:'',
            }
        }
    });
    
    const HandleSave = async () =>{
        let response = await Saverestaurant($token , id , restaurant);
        if(response.status == 200){
            alert("Done");
            navigate("/admin/restaurants", { replace: true });
        }
    }

    let Uploading = false;
    let UploadingProgress = 0;
    const HandleUpload = async() => {
        Uploading = true;
        let res = await GetRestaurantImagePUTURL($token , id);
        let res2 = await putImageToAWS(files[0] , res.url, (progress) => {
            UploadingProgress = progress;
        });
        if(res2.status === 200){
            restaurant.imageURL = res.restaurant.imageURL;
            alert("Image uploaded successfully");
            UploadingProgress = 0;
            Uploading = false;
        }
    }
</script>
<br />
<br />
<div class="row">
    <div class="col col-md-4 offset-md-2">
        <div class="card">
            <div class="card-header">{title} restaurant</div>
            <div class="card-body">
                {#if restaurant}
                    <form>
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" bind:value={restaurant.name} class="form-control" iaria-describedby="emailHelp" placeholder="New-York Fried Chicken">
                        </div>
                        <div class="form-group">
                            <label>Address</label>
                            <input type="text" bind:value={restaurant.address} class="form-control" aria-describedby="nameHelp" placeholder="MurphyCanyon Road">
                        </div>
                        <div class="form-group">
                            <label>city</label>
                            <input type="text" bind:value={restaurant.city} class="form-control" aria-describedby="nameHelp" placeholder="San Jose">
                        </div>
                        <div class="form-group">
                            <label>state</label>
                            <input type="text" bind:value={restaurant.state} class="form-control" aria-describedby="nameHelp" placeholder="California">
                        </div>
                        <div class="form-group">
                            <label>country</label>
                            <input type="text" bind:value={restaurant.country} class="form-control" aria-describedby="nameHelp" placeholder="United States of America">
                        </div>

                        <div class="form-check">
                            <label class="form-check-label">
                                <input type="radio" bind:group={restaurant.cuisine} value={"Desi"} class="form-check-input">Desi
                            </label>
                            </div>
                            <div class="form-check">
                            <label class="form-check-label">
                                <input type="radio" bind:group={restaurant.cuisine} value={"Italian"} class="form-check-input">Italian
                            </label>

                            </div>
                            <div class="form-check">
                            <label class="form-check-label">
                                <input type="radio" bind:group={restaurant.cuisine} value={"American"} class="form-check-input">American
                            </label>

                            </div>
                            <div class="form-check">
                            <label class="form-check-label">
                                <input type="radio" bind:group={restaurant.cuisine} value={"Japanese"} class="form-check-input">Japanese
                            </label>
                        </div>
                        <br />
                        <button type="button" on:click={HandleSave} class="btn btn-primary">Save</button>
                    </form>
                {:else}
                    <p>Loading restaurant</p>
                {/if}
                
            </div>
        </div>
    </div>
    {#if id !== "new"}
        {#if restaurant}
            <div class="col col-md-4">
                <div class="card">
                    <div class="card-header">Image for <b>{restaurant.name}</b> </div>
                    <div class="card-body">
                        {#if restaurant.imageURL !== null} 
                            <div class="col col-md-12 text-center">
                                <img alt="item image" src={restaurant.imageURL} style="width:100%; border-radius:5px;" />
                                <b>Current Image</b>
                            </div>
                        {/if}
                        <form>
                            <div class="form-group">
                                <label>Restaurant image</label>
                                <input type="file" bind:files iaria-describedby="emailHelp">
                            </div>
                            {#if Uploading === false}
                                <button type="button" on:click={HandleUpload} class="btn btn-primary">Upload</button>
                            {:else}
                                <span>Uploading... (%{UploadingProgress})</span>
                            {/if}
                            {#if files && files[0]}
                                <span> File name {files[0].name}</span>
                            {/if}
                        </form>
                    </div>
                </div>
            </div>
        {/if}
    {/if}
</div>