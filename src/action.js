import * as actions from './actionLookup'

export const updateCart = (order) => {
  return {
    type: actions.ADD_TO_CART,
    order
  }
}
