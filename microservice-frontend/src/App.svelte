<script>
    import { authorized , user } from './stores/auth.store.js';
	import Login  from "./views/Login.view.svelte";
	import Logout  from "./views/logout.svelte";
	import { Router, Link, Route } from "svelte-routing";
	import { link } from "svelte-routing";

	import UsersView  from "./views/users/all.svelte"; 
	import EdituserView  from "./views/users/form.svelte"; 


	import CustomersView  from "./views/customers/all.svelte"; 


	import OrdersView  from "./views/orders/all.svelte"; 
	import EditOrderView  from "./views/orders/form.svelte"; 

	import restaurantsView  from "./views/restaurants/all.svelte"; 
	import EditrestaurantsView  from "./views/restaurants/form.svelte"; 

	import MenusView  from "./views/menus/all.svelte"; 
	import EditMenusView  from "./views/menus/form.svelte"; 

	import MenuitemsView  from "./views/menuitems/all.svelte"; 
	import EditMenuitemsView  from "./views/menuitems/form.svelte"; 

	import HomeView  from "./views/Home.view.svelte"; 

	let email = '';
	let password = '';

	let showLogin;
	let userDetails;


	authorized.subscribe(value => {
		showLogin = value;
	});

	user.subscribe(value => {
		userDetails = value;
	});

	export let url = "";

</script>

<main class="container">
	{#if !showLogin}
		<div class="text-center">
			<h3>MICROSERVICE MULTI-restaurant SYSTEM</h3>
			<p>Developed using svelte</p>
		</div>
		<Login />
	{:else}
		<Router url="{url}" basepath="/admin">
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<a class="navbar-brand" href="/admin" use:link >
				{#if userDetails.type == 1}
					ADMIN
				{:else}
					OWNER
				{/if}
				</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div class="navbar-nav">
					<a class="nav-item nav-link active" href="/admin" use:link >Home <span class="sr-only">(current)</span></a>
					{#if userDetails.type == 1}
						<a class="nav-item nav-link" href="/admin/users" use:link >Users</a>
						<a class="nav-item nav-link" href="/admin/restaurants" use:link >Restaurants</a>
						<a class="nav-item nav-link" href="/admin/customers" use:link >Customers</a>
					{/if}
					<a class="nav-item nav-link" href="/admin/menus" use:link >Menus</a>
					<a class="nav-item nav-link" href="/admin/orders" use:link >Orders</a>
					<a class="nav-item nav-link" href="/admin/logout" use:link >Logout</a>
					</div>
				</div>
			</nav>
			<div class="col col-md-12">
				
				<Route path="logout" component="{Logout}" />

				<Route path="users" component="{UsersView}" />
				<Route path="users/:id" let:params component="{EdituserView}"/>

				<Route path="customers" component="{CustomersView}" />


				<Route path="restaurants" component="{restaurantsView}" />
				<Route path="restaurants/:id" component="{EditrestaurantsView}" />


				<Route path="menus" component="{MenusView}" />
				<Route path="menus/:id" component="{EditMenusView}" />


				<Route path="menus/:menuId/menuitems" component="{MenuitemsView}" />
				<Route path="menus/:menuId/menuitems/:id" component="{EditMenuitemsView}" />
				

				<Route path="orders" component="{OrdersView}" />
				<Route path="orders/:id" component="{EditOrderView}" />

				<Route path="/"><HomeView /></Route>
			</div>
		</Router>
	{/if}
</main>

<style>
	main {
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h3 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 3em;
		font-weight: 200;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>