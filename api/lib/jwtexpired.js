const jwt = require('jsonwebtoken')
function CheckExpiration (token){
    if (typeof(token) !== 'string' || !token) throw new Error('Invalid token provided');
    let isJwtExpired = false;
    const { exp } = jwt.decode(token);
    const currentTime = new Date().getTime() / 1000;

    if (currentTime > exp) isJwtExpired = true;
  
    return isJwtExpired;
}
module.exports = {CheckExpiration}