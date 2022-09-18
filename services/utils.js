const getRemoteHostId = function (req) {
    return req.ip || 
            req.headers['x-forwarded-for'] || 
            req.connection.remoteAddress || 
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress ||
            req.headers['x-cluster-client-ip'] || 
            req.headers['x-real-ip'];
};

module.exports = {
    getRemoteHostId : getRemoteHostId
};