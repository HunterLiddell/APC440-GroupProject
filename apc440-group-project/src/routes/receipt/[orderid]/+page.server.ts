import { getOrderById } from "$lib/services/db/orders";
import { redirect } from "@sveltejs/kit";


export const load = async ({ params, locals }) => {
    const { user } = locals;

    const orderId = params.orderid;

    // Fetch the order details from the database using the orderId
    const order = await getOrderById(orderId);
    
    if (!order) {
        throw redirect(302, "/myaccount");
    }

    return {
        order,
        user,
    };
}