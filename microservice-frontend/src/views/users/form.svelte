<script>
    import { onMount } from 'svelte';
    import { GetAllrestaurants } from '../../stores/restaurants.store.js';
    import { GetUserById , SaveUser } from "../../stores/users.store.js";
    import { token } from "../../stores/auth.store.js";
    import { navigate } from "svelte-routing";
    export let id;

    let title = "Edit";

    if(id == "new"){
        console.log("In the New");
        title = "New";
    } 

    let userTypes = [
		{ id: 1, text: `Administrator` },
		{ id: 2, text: `restaurant Owner` },
	];

    let user;
    let restaurants;
    
    onMount(async () => {

        restaurants = await GetAllrestaurants($token);
        if(id != "new"){
            const promise = GetUserById($token , id);
            user = await promise;
        } else {
            user = {
                fullName : '',
                email : '',
                ownership: restaurants[0].id,
                type: 2,
            }
        }
    });
    
    const HandleSave = async () =>{
        if(user.type == 1)
            user.ownership = 0;
        let response = await SaveUser($token , id , user);
        if(response.status == 200){
            alert("Done");
            navigate("/admin/users", { replace: true });
        }
    }
</script>


<div class="col col-md-4 offset-md-4">
    <div class="card">
        <div class="card-header">{title} User</div>
        <div class="card-body">
            {#if user}
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" bind:value={user.email} class="form-control" iaria-describedby="emailHelp" placeholder="Sample@domain.com">
                    </div>
                    <div class="form-group">
                        <label for="inputname">Name</label>
                        <input type="text" bind:value={user.fullName} class="form-control" aria-describedby="nameHelp" placeholder="Frank Drank">
                    </div>

                    {#if id == "new"}
                        <div class="form-group">
                            <label for="inputname">Password</label>
                            <input type="text" bind:value={user.password} class="form-control" aria-describedby="nameHelp" placeholder="Secret">
                        </div>
                        <div class="form-group">
                            <label for="inputname">Confirm Password</label>
                            <input type="text" bind:value={user.confirmPassword} class="form-control" aria-describedby="nameHelp" placeholder="Secret">
                        </div>
                    {/if}

                    {#if user.type == 2} 
                        {#if restaurants}
                            <div class="form-group">
                                <label for="inputname">Restaurant</label>
                                <select type="text" bind:value={user.ownership} class="form-control" aria-describedby="nameHelp" placeholder="Secret">
                                    {#each restaurants as item}
                                        <option value={item.id}> {item.name} </option>
                                    {/each}
                                </select>
                            </div>
                        {/if}
                    {/if}

                    <div class="form-check">
                        <label class="form-check-label">
                            <input type="radio" bind:group={user.type} value={1} class="form-check-input">Administrator
                        </label>
                        </div>
                        <div class="form-check">
                        <label class="form-check-label">
                            <input type="radio" bind:group={user.type} value={2} class="form-check-input">restaurant Owner
                        </label>
                    </div>
                    <br />
                    <button type="button" on:click={HandleSave} class="btn btn-primary">Save</button>
                </form>
            {:else}
                <p>Loading User</p>
            {/if}
            
        </div>
    </div>
</div>