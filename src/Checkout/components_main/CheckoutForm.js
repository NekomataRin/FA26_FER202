import typhLoading from '../components_img/typho-loading.png'
import { useFormik } from 'formik'
import { itemList } from '../components_data/itemList'
import { useReducer, useContext, useState } from 'react'
import { ThemeContext } from '../../Orchid/components_utils/ThemeContext'
import '../components_utils/checkout.css'
import * as Yup from 'yup'

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
            //Reset toàn bộ giỏ hàng
            case 'clear-cart': {
                tempState.item = initState
                break
            }
            default: {
                throw Error(`Unknown Type ${action.type}`)
            }
        }
        return { ...tempState, ...calcTotal(tempState.item) }
    }

    //Formik và Yup
    const [checkOrder, setOrder] = useState(null)

    const checkoutSchema = Yup.object({
        fullName: Yup.string().trim()
            .min(3, 'Full name must be at least 3 characters')
            .required('Full name is required'),
        email: Yup.string().trim()
            .email('Invalid email address')
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Email must have a domain, e.g. name@gmail.com')
            .required('Email is required'),
        phone: Yup.string()
            .matches(/^(0|\+84)[35789]\d{8}$/, 'Invalid phone number (e.g. 0912345678)')
            .required('Phone is required'),
        address: Yup.string().trim().required('Address is required'),
        paymentMethod: Yup.string()
            .oneOf(['COD', 'Card'], 'Please select a payment method')
            .required('Payment method is required'),
        agreeTerms: Yup.boolean().oneOf([true], 'You must agree to the terms'),
    })

    const textFields = [
        { name: 'fullName', label: 'Full name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'phone', label: 'Phone', type: 'tel' },
        { name: 'address', label: 'Address', type: 'text' },
    ]

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            phone: "",
            address: "",
            paymentMethod: "",
            agreeTerms: false
        },
        validationSchema: checkoutSchema,
        onSubmit: (values) => {
            setOrder({
                customer: values,
                items: cartItems.map((p) => ({
                    id: p.id, name: p.name, price: p.price, quantity: cart.item[p.id],
                })),
                totalQuantity: cart.totalQuantity,
                totalPrice: cart.totalPrice,
            })
            dispatch({ type: 'clear-cart' })
            formik.resetForm()
        }
    })

    const hasError = (name) => formik.touched[name] && formik.errors[name]

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

            <hr />

            {checkOrder ? (
                <div className="checkout-confirm">
                    <h2 style={{ textAlign: 'center' }}>Order confirmation</h2>
                    <hr />
                    <h4>Customer info</h4>
                    <p><strong>Full name:</strong> {checkOrder.customer.fullName}</p>
                    <p><strong>Email:</strong> {checkOrder.customer.email}</p>
                    <p><strong>Phone:</strong> {checkOrder.customer.phone}</p>
                    <p><strong>Address:</strong> {checkOrder.customer.address}</p>
                    <p><strong>Payment method:</strong> {checkOrder.customer.paymentMethod}</p>

                    <h4>Items</h4>
                    <div className="row checkout-head">
                        <div className="col-4">Name</div>
                        <div className="col-4">Unit price x Quantity</div>
                        <div className="col-4">Price</div>
                    </div>
                    {checkOrder.items.map((item) => (
                        <div className="row checkout-row" key={item.id}>
                            <div className="col-4"><strong>{item.name}</strong></div>
                            <div className="col-4">${item.price} x {item.quantity}</div>
                            <div className="col-4">${item.price * item.quantity}</div>
                        </div>
                    ))}

                    <div className="checkout-summary">
                        <p><strong>Total quantity:</strong> {checkOrder.totalQuantity}</p>
                        <p><strong>Total price:</strong> ${checkOrder.totalPrice}</p>
                    </div>

                    <button className="btn btn-primary" onClick={() => setOrder(null)}>
                        Place another order
                    </button>
                </div>
            ) : (
                <form className="checkout-form" onSubmit={formik.handleSubmit} noValidate>
                    <h2 style={{ textAlign: 'center' }}>Checkout</h2>

                    {textFields.map((f) => (
                        <div className="mb-3" key={f.name}>
                            <label htmlFor={f.name} className="form-label"><strong>{f.label}</strong></label>
                            <input id={f.name} type={f.type}
                                className={'form-control' + (hasError(f.name) ? ' is-invalid' : '')}
                                {...formik.getFieldProps(f.name)} />
                            {hasError(f.name) && <div className="text-danger small">{formik.errors[f.name]}</div>}
                        </div>
                    ))}

                    <div className="mb-3">
                        <strong>Payment method</strong>
                        <div>
                            {['COD', 'Card'].map((m) => (
                                <label className="me-3" key={m}>
                                    <input type="radio" name="paymentMethod" value={m}
                                        checked={formik.values.paymentMethod === m}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} /> {m}
                                </label>
                            ))}
                        </div>
                        {hasError('paymentMethod') && <div className="text-danger small">{formik.errors.paymentMethod}</div>}
                    </div>

                    <div className="mb-3">
                        <label>
                            <input type="checkbox" name="agreeTerms"
                                checked={formik.values.agreeTerms}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} /> I agree to the terms
                        </label>
                        {hasError('agreeTerms') && <div className="text-danger small">{formik.errors.agreeTerms}</div>}
                    </div>

                    <button type="submit" className={cartItems.length === 0 ? "btn btn-secondary" : "btn btn-primary"} disabled={cartItems.length === 0}>
                        <strong>Place order</strong>
                    </button>
                    {cartItems.length === 0 && <p className="small">Add items to your cart to place an order.</p>}
                </form>
            )}
        </div>
    )
}