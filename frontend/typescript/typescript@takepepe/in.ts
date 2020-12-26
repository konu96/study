interface User {
  id: string
}

interface AppUser {
  appName: 'appName';
  appID: string
}

interface ServiceUser {
  serviceName: 'serviceName';
  serviceID: string
}

const getUserID = (user: User | AppUser | ServiceUser) => {
  if ('appName' in user) {
    return user.appID;
  }
  if ('serviceName' in user) {
    return user.serviceID;
  }
  return user.id;
};
