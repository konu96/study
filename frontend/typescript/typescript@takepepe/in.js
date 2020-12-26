var getUserID = function (user) {
    if ('appName' in user) {
        return user.appID;
    }
    if ('serviceName' in user) {
        return user.serviceID;
    }
    return user.id;
};
