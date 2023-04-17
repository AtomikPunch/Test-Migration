class Order {
    constructor(order, user) {
        this.request = {
            site_id: user.site_id,
            token: user.token,
            user_id: user.user_id,
            endpoint_id: order.request.endpoint_id,
            order: order.request.order
        };
        this.request.order.ordering.user_id = user.user_id;
        this.last_id = order.last_id;
        this.ids = ((order.ids === undefined) ? {} : order.ids);
    }
};
export default Order;