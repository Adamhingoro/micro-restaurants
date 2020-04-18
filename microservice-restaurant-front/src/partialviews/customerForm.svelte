<script>
    import { onMount } from 'svelte';
    import { RegisterCustomer , Customer } from "../stores/customers.store.js";
    import { placeOrder } from "../stores/orders.store.js"; 
    import { navigate } from "svelte-routing";



    let OrderPlaced = false;
    let LCustomer = {
            fullName: '',
            email: '',
            address: '',
            city: '',
            country: '',
            state: '',
        };

    Customer.subscribe( (x) => {
        console.log("Customer " , x);
        if(x.registered){
            LCustomer = x;
            console.log("Customer Loaded");
        }
    })


    async function handleSubmit(event) {
       console.log(event);
       console.log(event.target);
       console.log("LCustomer" , LCustomer);
       let res = await RegisterCustomer(LCustomer);
       console.log("Registring " ,res);
       if(res.status === 201){
           alert("Thank you for registering");
           LCustomer.registered = 1;
       };
    }

    async function handlePlaceOrder(event) {
        let ai = placeOrder();
        console.log("THIS IS AI " , ai);
       if(ai){
            OrderPlaced = true;
            navigate(`/front/thankyou/`, { replace: true });
       }
    }


</script>

<div class="top-margin">
    <div class="col col-xs-12">
        <hr />
        <h3 class="heading">YOUR DETAILS</h3>
    </div>
    <div class="col col-md-12">
        {#if LCustomer.registered}
            {#if OrderPlaced}
                 <h1 class="heading">THANK YOU {LCustomer.fullName}</h1>
                 <h4 class="heading">Your Order has been placed.</h4>
            {:else}
                 <!-- else content here -->
            {/if}

             <h1 class="heading">{LCustomer.fullName}</h1>
             <h4 class="heading">({LCustomer.email})</h4>
             <button on:click={handlePlaceOrder} class="btn btn-danger btn-block checkout">PLACE ORDER <i class="fa fa-arrow-right" aria-hidden="true"></i></button>

        {:else} 
            <form on:submit|preventDefault={handleSubmit}>
                <div class="form-group">
                    <label >Full name</label>
                    <input type="text" bind:value={LCustomer.fullName} class="form-control" required min="3">
                </div>

                <div class="form-group">
                    <label >Email address</label>
                    <input type="email" bind:value={LCustomer.email} class="form-control"  required>
                </div>

                <div class="form-group">
                    <label >Address</label>
                    <input type="text" bind:value={LCustomer.address} class="form-control"  required min="3">
                </div>

                <div class="form-group">
                    <label >City</label>
                    <input type="text" bind:value={LCustomer.city} class="form-control"  required min="3">
                </div>

                <div class="form-group">
                    <label >Country</label>
                    <input type="text" bind:value={LCustomer.country} class="form-control"  required min="3">
                </div>

                <div class="form-group">
                    <label >State</label>
                    <input type="text" class="form-control" bind:value={LCustomer.state} required min="3">
                </div>

                <button type="submit" class="btn btn-danger btn-block checkout">CONTINUE <i class="fa fa-arrow-right" aria-hidden="true"></i></button>
            </form>
        {/if}
    </div>
</div>
<style>
    .top-margin{
        margin-top: 60px;
    }
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
</style>