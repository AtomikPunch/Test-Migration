//const axios = require('axios');
let JardilandRequester = require('../requesters/jardiland-requester');


async function getAccessToken(user) {
    let route = '/login';
    let body = {
        "site_id": user.site_id,
        "user_id": user.login,
        "password": user.password
    }

    response = await JardilandRequester.performPostRequest(route, body);
    return response.token;
}
exports.getAccessToken = getAccessToken;

async function getOrderDetails(user, order) {
    let route = '/v3/orders/' + order.id;
    let body = {
        "site_id": user.site_id,
        "token": user.token,
        "fields": [
            "state",
            "line_item_groups.state",
            "line_item_groups.endpoint_id",
            "line_item_groups.index_ranges",
            "parcels.id",
            "parcels.state",
            "parcels.endpoint_id"
        ]
    }

    response = await JardilandRequester.performGetRequest(route, body);
    return response;
}
exports.getOrderDetails = getOrderDetails;