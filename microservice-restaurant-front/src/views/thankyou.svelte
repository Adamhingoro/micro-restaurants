<script>
    import { onMount } from 'svelte';
    import { Customer } from "../stores/customers.store.js";
    import { navigate } from 'svelte-routing';

    

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

    const RedirectToHome = () =>{
        navigate(`/front/`, { replace: true });
    }

</script>
<div class="col col-xs-4  col-md-4 top-margin">
    <h1 class="heading">THANK YOU <br /> {LCustomer.fullName}</h1>
    <h4 class="heading">Your Order has been placed.</h4>
    <button on:click={RedirectToHome} class="btn btn-block btn-danger home">HOME</button>
</div>
<style>
    .top-margin{
        margin-top: 60px;
        margin: 0px auto;
    }
    .home {
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