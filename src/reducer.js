import produce from 'immer'
import * as actions from './actionLookup'


const initState = {
  buyer:{},
  order:[],
  products:require('./product.json')
}

function reducer2(state=initState, action) {
  switch (action.type) {
    case actions.ADD_TO_CART:
      console.log(action);
      let newOrder = action.order
      console.log(state.order.concat(newOrder));
      return {
        ...state,
        order: state.order.concat(newOrder)
      }

    default:
      return state

  }
}

export default function reducer(state=initState, action) {
   return produce(state, draft => {
    switch (action.type) {
      case actions.ADD_TO_CART:
        console.log(action);
        let newOrder = action.order
        console.log(newOrder);

        console.log(state.order.filter(order=>order.id != newOrder.id || order.color != newOrder.color));
        draft.order= state.order.filter(order=>order.id != newOrder.id || order.color != newOrder.color).concat(newOrder)
        break
      default:
        console.log(draft);
        return draft

    }
  })

}
