<script>
    import { onMount } from 'svelte';
    import { GetMenuItemById , SaveMenuItem , GetMenuItemImagePUTURL} from "../../stores/menuitems.store.js";
    import { GetMenuById , SaveMenu } from "../../stores/menus.store.js";
    import MenuLink from "../../partialviews/menulink.svelte";


    import { user ,token , putImageToAWS } from "../../stores/auth.store.js";
    import { navigate } from "svelte-routing";
    export let id , menuId;

    let title = "Edit";

    if(id == "new"){
        title = "New";
    } 
    let menuitem;
    let menu;
    let files;

    
    onMount(async () => {
        if(id != "new"){
            const promise = GetMenuItemById($token , id);
            menuitem = await promise;
        } else {
            menuitem = {
                name: '',
                description: '',
                menuId: menuId,
                price: '',
            }
        }
        restaurants = await GetAllrestaurants($token);
    });
    
    const HandleSave = async () =>{
        let response = await SaveMenuItem($token , id , menuitem);
        if(response.status == 201){
            alert("Done");
            navigate(`/admin/menus/${menuId}/menuitems`, { replace: true });
        }
    }

    let Uploading = false;
    let UploadingProgress = 0;
    const HandleUpload = async() => {
        Uploading = true;
        let res = await GetMenuItemImagePUTURL($token , id);
        let res2 = await putImageToAWS(files[0] , res.url, (progress) => {
            UploadingProgress = progress;
        });
        if(res2.status === 200){
            menuitem.imageURL = res.item.imageURL;
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
        <div class="card-header">{title} Menuitem for <MenuLink id={menuId} /></div>
        <div class="card-body">
            {#if menuitem}
                <form>
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" bind:value={menuitem.name} class="form-control" iaria-describedby="emailHelp" placeholder="New-York Fried Chicken">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea type="text" bind:value={menuitem.description} class="form-control" aria-describedby="nameHelp" placeholder="MurphyCanyon Road"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Price</label>
                        <input type="number" bind:value={menuitem.price} class="form-control" iaria-describedby="emailHelp" placeholder="0.00">
                    </div>
                    <button type="button" on:click={HandleSave} class="btn btn-primary">Save</button>
                </form>
            {:else}
                <p>Loading Menu Item</p>
            {/if}
        </div>
    </div>
</div>

{#if id !== "new"}
    {#if menuitem}
        <div class="col col-md-4">
            <div class="card">
                <div class="card-header">Image for <b>{menuitem.name}</b> </div>
                <div class="card-body">
                    {#if menuitem.imageURL !== null} 
                        <div class="col col-md-12 text-center">
                            <img alt="item image" src={menuitem.imageURL} style="width:100%; border-radius:5px;" />
                            <b>Current Image</b>
                        </div>
                    {/if}
                    <form>
                        <div class="form-group">
                            <label>Menu item image</label>
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