import produce from 'immer'
import * as actions from './actionLookup'


const initState = {
  buyer:{
    name:"",
    email:"",
    cell:""
  },
  order:[],
  products:require('./productData/product.json'),
  productList:[]
}

export default function reducer(state=initState, action) {
  console.log(action);
   return produce(state, draft => {
    switch (action.type) {
      case actions.ADD_TO_CART:
        console.log(action);
        let newOrder = action.order
        console.log(newOrder);
        console.log(state.order.filter(order=>order.id != newOrder.id || order.color != newOrder.color));
        draft.order= state.order.filter(order=>order.id !== newOrder.id || order.color !== newOrder.color ||  order.size !== newOrder.size).concat(newOrder)
        break

      case actions.REMOVE_FROM_CART:
        console.log(action);
        let deletedOrder = action.order
        draft.order= state.order.filter(order=>order.id !== deletedOrder.id || order.color !== deletedOrder.color ||  order.size !== deletedOrder.size)
        break

      case actions.UPDATE_CONTACT:
        console.log(action,draft);
        draft.buyer = action.buyer
        break

      case actions.INIT_PRODUCTS:
        console.log(action,draft);
        draft.productList = action.products
        break

      default:
        console.log(draft);
        return draft

    }
  })

}
