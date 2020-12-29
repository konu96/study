export const state = () => ({
  products: [],
  count: 5,
  loggedInUser: {
    name: 'John',
    role: 'Admin',
  },
});

export const getters = {
  depletedProducts: state => {
    return state.products.filter(product => product.stock <= 0);
  },
  getProductById: state => id => {
    return state.products.find(product => product.id === id);
  },
};

export const mutations = {
  incrementBy(state, payload) {
    state.count += payload.amount;
  },
};
