const { Order } = require('../types/order');
const { orders } = require('../../../resources/datasources/orders.js');

exports.OrderProvider = (function () {

    var constructeur = function () {
        this.last_order = null;

        this.fetch = function (order_reference) {
            this.last_order = new Order(orders[order_reference]);
            return this.last_order;
        }
    }

    var instance = null;
    return new function () {
        this.getInstance = function () {
            if (instance == null) {
                instance = new constructeur();
                instance.constructeur = null;
            }

            return instance;
        }
    }
})();