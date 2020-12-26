type Action = {
  type: string,
  payload: number
}

const reduce = (state = [100], action: Action) => {
  switch (action.type) {
    case 'CONCAT':
      return state.concat(action.payload)
    case 'REMOVE':
      return state.filter(val => val !== action.payload)
    default: return state;
  }
};
