//user queries
const createUser = `
mutation CreateUser($user: UserInput!) {
  createUser(user: $user) {
    message
    data {
      id
      username
    }
  }
}
`;

const login = `
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    message
    token
    user {
      id
      username
    }
  }
}
`;

const checkToken = `
query CheckToken {
    checkToken {
      message
      user {
        username
      }
    }
  }
`;

const updateUser = `
mutation UpdateUser($user: UserInput!) {
  updateUser(user: $user) {
    message
    data {
      id
      username
    }
  }
}
`;

const deleteUser = `
mutation DeleteUser($deleteUserId: String!) {
  deleteUser(id: $deleteUserId) {
    data {
      id
    }
  }
}
`;

const userById = `
query UserById($userByIdId: String!) {
  userById(id: $userByIdId) {
    id
    username
  }
}
`;

const allUsers = `
query Users {
  users {
    id
    username
  }
}
`;

const userByUsername = `
query UserByUsername($username: String!) {
  userByUsername(username: $username) {
    username
  }
}
`;

//notification queries
const addNotification = `
mutation AddNotification($locName: String!, $time: DateTime!) {
  addNotification(loc_name: $locName, time: $time) {
    id
    loc_name
    time
  }
}
`;

const deleteNotification = `
mutation DeleteNotification($deleteNotificationId: ID!) {
  deleteNotification(id: $deleteNotificationId) {
      id
  }
}
`;

const notificationsByUser = `
query NotificationsByUser($userId: ID!) {
  notificationsByUser(userId: $userId) {
    loc_name
    time
    id
  }
}
`;

const allNotifications = `query Notifications {
  notifications {
    id
    loc_name
    time
    user_id {
      id
      username
    }
  }
}
`;


// favourite location queries
const addFavourite = `
mutation AddFavourite($locName: String!, $address: String!, $city: String!) {
  addFavourite(loc_name: $locName, address: $address, city: $city) {
    id
    loc_name
    address
    city
  }
}
`;

const deleteLocation = `
mutation DeleteLocation($deleteFavouriteId: ID!) {
  deleteFavourite(id: $deleteFavouriteId) {
    id
  }
}
`;

const allLocations = `
query Query {
  favourites {
    id
    loc_name
    address
    city
  }
}
`;

const locationsByUser = `
query FavouritesByUser($userId: ID!) {
  favouritesByUser(userId: $userId) {
    address
    loc_name
    city
    id
  }
}
`;

const locationById = `
query FavouriteById($favouriteById: ID!) {
  favouriteById(id: $favouriteById) {
    address
    loc_name
    city
    id
  }
}
`;

export {
  createUser,
  login,
  checkToken,
  updateUser,
  deleteUser,
  userById,
  userByUsername,
  allUsers,
  addNotification,
  deleteNotification,
  notificationsByUser,
  allNotifications,
  addFavourite,
  deleteLocation,
  allLocations,
  locationsByUser,
  locationById
};
