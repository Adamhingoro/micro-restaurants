import { writable } from 'svelte/store';
import axios from "axios";
import { Customer } from "./customers.store.js";
import { api_hostname } from "./auth.store.js";

const order = writable(JSON.parse(localStorage.getItem("myorder")) || []);
const orderrestaurant = writable(localStorage.getItem("myorderrestaurant") || []);

let CustomerId;
Customer.subscribe((x) => {
    CustomerId = parseInt(x.id);
    return x;
});


let RestaurantId;
orderrestaurant.subscribe((x) => {
    RestaurantId = x;
    return x;
});

const UpdatedOrdersStore = (store) => {
    localStorage.setItem("myorder", JSON.stringify(store));
}
const UpdatedRestaurantStore = (store) => {
    localStorage.setItem("myorderrestaurant", store);
}

const resetOrderStore = () => {
    localStorage.removeItem("myorder");
    localStorage.removeItem("myorderrestaurant");
    orderrestaurant.set(null);
    order.set([]);
}

const AddOrderItem = (itemId , quantity , menuItem , restaurantId) => {
    order.update((CurrentOrders) => {
        if(CurrentOrders.length === 0){
            orderrestaurant.update((x) => {
                UpdatedRestaurantStore(restaurantId);
                return restaurantId;
            });
        }

        let ItemAlready = CurrentOrders.find((item) => {
            return item.menuitemId === itemId;
        })
        if(ItemAlready){
            var foundIndex = CurrentOrders.findIndex(x => x.menuitemId === ItemAlready.menuitemId);
            ItemAlready.quantity += quantity;
            CurrentOrders[foundIndex] = ItemAlready;
            console.log("Item Already " , foundIndex , ItemAlready);
        } else {
            CurrentOrders.push({
                menuitemId:itemId, 
                quantity : quantity,
                menuItem : menuItem
            });
        }
        console.log("Orders" , CurrentOrders);
        UpdatedOrdersStore(CurrentOrders);
        return CurrentOrders;
    });
    console.log("Item added to the cart");
}

const RemoveOrderItem = (itemId , quantity ) => {
    order.update((CurrentOrders) => {  
        let ItemAlready = CurrentOrders.find((item) => {
            return item.menuitemId === itemId;
        })
        if(ItemAlready){
            var foundIndex = CurrentOrders.findIndex(x => x.menuitemId === ItemAlready.menuitemId);
            ItemAlready.quantity -= quantity;
            CurrentOrders[foundIndex] = ItemAlready;

            if(ItemAlready.quantity === 0){
                CurrentOrders = CurrentOrders.filter((val , i , arr) => {
                    return val.menuitemId !== itemId;
                });
                console.log("Completely removed from the orders");
            }
        } else {
            console.log("Item not found....!");
        }
        console.log("Orders" , CurrentOrders);
        UpdatedOrdersStore(CurrentOrders);
        return CurrentOrders;
    });
    console.log("Item Decreased to the cart");
}

const CreateOrder = async (Order) => {
    const OrderInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/orders/`,
    });
    try {
        let NewOrder = {
            customerId:Order.customerId,
            restaurantId:parseInt(Order.restaurantId), // dont know this but it works.
        }
        const response = await OrderInstance.post(`/` , NewOrder);
        return response;
    } catch (error) {
        console.error(error);
    }
}

const CreateOrderItem = async (OrderItem) => {
    const OrderItemInstance = axios.create({
        baseURL: `${api_hostname}/api/v0/orderitems/`,
    });
    try {
        let NewOrder = {
            orderId: OrderItem.orderId,
            menuItemId: OrderItem.menuitemId,
            quantity: OrderItem.quantity,
        }
        const response = await OrderItemInstance.post(`/` , NewOrder);
        console.log("Order ITEM RESPONSE" , response);
        return response;
    } catch (error) {
        console.error(error);
    }
}

const placeOrder = async () => {
    await order.update( async (CurrentOrders) => {  
        if(CurrentOrders.length > 0){
            let res = await CreateOrder({
                customerId: CustomerId,
                restaurantId:RestaurantId
            });
            if(res.status === 201){
                await CurrentOrders.forEach( async item => {
                    await CreateOrderItem({...item , orderId:res.data.id});
                });
                console.log("Order Placed successfull")
                resetOrderStore();
                return [];
            } else {
                alert("Error while placing order");
            }
        } else {
            console.log("No items in the cart to process");
        }
        return CurrentOrders;
    });
    return true;
}

export { order  , orderrestaurant , AddOrderItem , RemoveOrderItem , placeOrder };