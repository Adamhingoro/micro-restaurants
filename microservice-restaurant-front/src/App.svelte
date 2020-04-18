<script>
	import Thankyou from './views/thankyou.svelte';
	import Checkout from './views/checkout.svelte';
	import config from "./config.js";
	
	import { Router, Link, Route } from "svelte-routing";
	import Home from "./views/home.svelte";
	import About from "./views/about.svelte";
	import Restaurant from './views/restaurant.svelte';


	export let url = "";
</script>

<Router url="{url}" basepath="/front">
  <nav>
    <Link to="/front/">Home</Link>
    <Link class="btn btn-danger" to="/front/about">About</Link>
  </nav>
  <div class="container-fluid">
    <Route path="thankyou" component="{Thankyou}" />
    <Route path="checkout" component="{Checkout}" />
    <Route path="restaurant/:id" component="{Restaurant}" />
    <Route path="about" component="{About}" />
    <Route path="/" component="{Home}" />
  </div>
</Router>

<style>
nav{
	text-align: center;
    font-size: 20px;
    font-weight: bold;
    font-family: "Lato";
    text-transform: uppercase;
}

</style>
