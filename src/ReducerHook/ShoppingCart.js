import { act, useReducer } from "react"

export default function ShoppingCart() {

    /**
     * Shopping Cart
     * item, totalQuantity, totalPrice
     * thêm item => quantity, price tăng
     * thêm quantity => price tăng
     * -> useReducer
     */

    const itemValues = {
        item1: 5,
        item2: 10
    }

    const initialState = {
        item: { item1: 0, item2: 0 },
        totalQuantity: 0,
        totalPrice: 0
    }

    const [sCart, dispatch] = useReducer(reducer, {item: {item1: 0, item2: 0}, totalQuantity: 0, totalPrice: 0})
    function reducer(state, action) {
        const typeList = ["add_item"]
        const typeIndex = typeList.indexOf(action.type)

        let tempState = {}
        
        switch (typeIndex) {
            case 0:
                {

                    let tempItem = {
                        item1: (action.payload.item.item1) ? state.item.item1 + 1 : state.item.item1,
                        item2: (action.payload.item.item2) ? state.item.item2 + 1 : state.item.item2
                    }
                    tempState = {
                        item: tempItem,
                        totalQuantity: state.item.item1 + state.item.item2,
                        totalPrice: state.totalPrice + action.payload.value
                    }
                    return tempState
                }
            default: {
                throw Error(`Unknown Type ${action.type}`)
            }
        }
    }
    return (
        <>
            <h1>Reducer Hook (Test)</h1>
            <h3>Product List:</h3>
            <>
                <button onClick={() => dispatch({ type: "add_item", payload: { item: { item1: "item1" }, value: itemValues.item1 } })}>Item 1 - Price: $5</button>
                <br />
                <button onClick={() => dispatch({ type: "add_item", payload: { item: { item2: "item2" }, value: itemValues.item2 } })}>Item 2 - Price: $10</button>
            </>
            <h3>Shopping Cart</h3>
            <ul>
                <li>
                    Item 1: {sCart.item.item1} | Price: ${sCart.item.item1 * itemValues.item1}
                </li>
                <li>
                    Item 2: {sCart.item.item2} | Price: ${sCart.item.item2 * itemValues.item2}
                </li>
            </ul>
            <label>{"> "}Total Quantity: {sCart.totalQuantity}</label>
            <br />
            <label>{"> "}Total Price: ${sCart.totalPrice}</label>
        </>
    )
}