import typhLoading from '../components_img/typho-loading.png'
import { useFormik } from 'formik'
import { itemList } from '../components_data/itemList'
import { useReducer, useContext } from 'react'
import { ThemeContext } from '../../Orchid/components_utils/ThemeContext'
import '../components_utils/checkout.css'

export default function CheckoutForm() {
    const { theme } = useContext(ThemeContext)
    const themeStyle = { backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }

    //useReducer Task
    /**
     * initState: Lưu trữ các thứ cần làm cho useReducer ứng với các hành động cần làm
     * item: lưu trữ Quantity của từng itemId một, để tránh việc append vô tội vạ trong 1 array khiến nó
     * rất dài và cực kì khó chịu khi xử lí
     * totalQuantity, totalPrice: Đây là yêu cầu của đề bài btw 
     */
    const initState = {
        item: {},
        totalQuantity: 0,
        totalPrice: 0,
    }

    //cart: state sau khi dùng dispatch của useReducer, có cấu trúc của initState
    const [cart, dispatch] = useReducer(reducer, initState)

    //Hàm tinh totalQuantity, với totalPrice: vì cart.item là 1 Object, và nó phải cần dùng đến cái này
    function calcTotal(items) {
        let totalQuantity = 0
        let totalPrice = 0

        for (const key of Object.keys(items)) {
            const quantity = items[key]

            //Tìm key item, thì key luôn là String, có thì tìm không thì continue để bỏ qua
            const product = itemList.find((e) => String(e.id) === key)
            if (!product) continue

            totalQuantity += quantity
            totalPrice += quantity * product.price
        }
        return { totalQuantity, totalPrice }
    }

    //Đây là item có trong cart, không phải Display
    const cartItems = itemList.filter((p) => (cart.item[p.id] ?? 0) > 0)

    function reducer(state, action) {
        //tempState: để tạm lưu state tạm thời, sau khi hoàn thành hết nghiệp vụ mới return
        //Khi item chưa có key, thì coi như quantity là 0, sau đó cộng 1
        //Khi remove item, thì quantity sẽ trả về 0
        let tempState = { ...state, item: { ...state.item } }

        switch (action.type) {
            //Thêm item vào giỏ
            case 'add-item':
                {
                    const id = action.payload
                    tempState.item[id] = (tempState.item[id] ?? 0) + 1
                    break
                }
            //Loại bỏ hoàn toàn item
            case 'remove-item':
                {
                    const id = action.payload
                    tempState.item[id] = 0
                    break
                }
            //Giảm số lượng item 1 đơn vị
            case 'decrease-item': {
                const id = action.payload
                tempState.item[id] = (Math.max(0, (tempState.item[id] ?? 0) - 1))
                break
            }
            //Chỉnh sửa số lượng item
            case 'set-quantity': {
                const { id, quantity } = action.payload
                const n = Math.floor(Number(quantity))
                // ô trống, NaN hoặc số nhỏ hơn 1 đều kẹp về 1
                tempState.item[id] = Number.isNaN(n) ? 1 : Math.max(n, 1)
                break
            }
            default: {
                throw Error(`Unknown Type ${action.type}`)
            }
        }
        return { ...tempState, ...calcTotal(tempState.item) }
    }

    return (
        <div className="container checkout" style={themeStyle}>
            <h2 style={{ textAlign: 'center' }}>--- Products ---</h2>
            <div className="row g-4">
                {itemList.map((item) => (
                    <div className="col-12 col-md-6 col-lg-3" key={item.id}>
                        <div className="card" style={themeStyle}>
                            <img className="checkout-img" src={typhLoading} alt={item.name} />
                            <hr />
                            <div className="card-body" style={{ textAlign: 'center' }}>
                                <h3>{item.name}</h3>
                                <p><strong>Price:</strong> ${item.price}</p>
                                <button className="btn btn-primary"
                                    onClick={() => dispatch({ type: 'add-item', payload: item.id })}>
                                    <strong>Add to cart</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <hr />

            <h2 style={{ textAlign: 'center' }}>--- Cart ---</h2>
            {cartItems.length === 0 ? (
                <p style={{ textAlign: 'center' }}> <img src={typhLoading} width='5%' /> Your cart is empty.</p>
            ) : (
                <div>
                    <div className="row checkout-head">
                        <div className="col-4">Name</div>
                        <div className="col-2">Unit price</div>
                        <div className="col-3">Quantity</div>
                        <div className="col-3">Action</div>
                    </div>
                    {cartItems.map((item) => (
                        <div className="row checkout-row" key={item.id}>
                            <div className="col-4"><strong>{item.name}</strong></div>
                            <div className="col-2">${item.price}</div>
                            <div className="col-3 checkout-qty">
                                <button className="btn btn-secondary btn-sm"
                                    onClick={() => dispatch({ type: 'decrease-item', payload: item.id })}>-</button>
                                <input type="number" className="form-control form-control-sm checkout-qty-input"
                                    value={cart.item[item.id]}
                                    onChange={(e) => dispatch({
                                        type: 'set-quantity',
                                        payload: { id: item.id, quantity: e.target.value }
                                    })} />
                                <button className="btn btn-secondary btn-sm"
                                    onClick={() => dispatch({ type: 'add-item', payload: item.id })}>+</button>
                            </div>
                            <div className="col-3">
                                <button className="btn btn-danger btn-sm"
                                    onClick={() => dispatch({ type: 'remove-item', payload: item.id })}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="checkout-summary" style={{ textAlign: 'center' }}>
                <p><strong>Total quantity:</strong> {cart.totalQuantity}</p>
                <p><strong>Total price:</strong> ${cart.totalPrice}</p>
            </div>
        </div>
    )
}