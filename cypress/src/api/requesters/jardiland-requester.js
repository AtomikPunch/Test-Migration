// #TODO : a way to perform GET request to onestock
//const axios = require('');

async function performRequestWithBody(method, route, body) {
    let config = {
        method: method,
        maxBodyLength: Infinity,
        url: 'https://www.jardiland.com/' + route,
        headers: {
            'Content-Type': 'application/json'
        },
        data: body
    }

    //let response = fubar
    response = await cy.request(config);
    return response.data;
}

async function performPostRequest(route, body) {
    return await performRequestWithBody('POST', route, body);
}
exports.performPostRequest = performPostRequest;

async function performGetRequest(route, body) {
    return await performRequestWithBody('GET', route, body);
}
exports.performGetRequest = performGetRequest;