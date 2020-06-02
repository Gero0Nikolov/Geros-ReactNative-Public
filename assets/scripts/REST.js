// Rest
var REST = {};

// Prepare Args Method
// args --> Array of Mixed Types
REST.prepareArgs = function( args ) {
    let result = "?token="+ REST.token;

    for (let [key, value] of Object.entries(args)) {        
        result += `&${key}=${value}`;
    }

    return result;
}

export default REST;