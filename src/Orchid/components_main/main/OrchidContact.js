import loginImg from '../../components_img/misc/loginimg.png'
import { useContext, useState } from "react"
import AuthContext from "../../components_utils/AuthContext"
import { ThemeContext } from '../../components_utils/ThemeContext'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import '../../components_utils/orchidCheckout.css'

export default function OrchidContact() {
    const { theme } = useContext(ThemeContext)
    const { user } = useContext(AuthContext)

    const [contact, setContact] = useState(null)

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
            agreeTerms: false
        },
        validationSchema: checkoutSchema,
        onSubmit: (values) => {
            setContact({
                customer: values,
            })
            formik.resetForm()
        }
    })

    const hasError = (name) => formik.touched[name] && formik.errors[name]

    return (!user) ? (
        <>
            <div className="container" style={{ backgroundColor: theme.backgroundColor, color: theme.color, borderColor: theme.borderColor }}>
                <h1>Please Login To View The Content</h1>
                <p>It really does feel empty out here...</p>
                <img class="loginImg" src={loginImg} alt="Typhoeus Wallpaper by 小皮不皮er" />
                <p>Not really... I guess... Image credits to <strong>小皮不皮er</strong></p>
                <hr />
            </div>
        </>
    ) : (contact) ? (
        <>
            <div className="checkout-confirm">
                <h2 style={{ textAlign: 'center' }}>Contact Information</h2>
                <hr />
                <h4>Customer info</h4>
                <hr />
                <div style={{ textAlign: 'left', margin: 'auto', paddingLeft: '10px' }}>
                    <p><strong>Full name:</strong> {contact.customer.fullName}</p>
                    <p><strong>Email:</strong> {contact.customer.email}</p>
                    <p><strong>Phone:</strong> {contact.customer.phone}</p>
                    <p><strong>Address:</strong> {contact.customer.address}</p>
                    <p><strong>Payment method:</strong> {contact.customer.paymentMethod}</p>
                </div>
                <button className="btn btn-primary" onClick={() => setContact(null)}>
                    Submit Other Info
                </button>
            </div>
        </>) :
        (<>
            <div className='container'>
                <form className="checkout-form" onSubmit={formik.handleSubmit} noValidate >
                    <h2 style={{ textAlign: 'center' }}>---Contact---</h2>

                    {
                        textFields.map((f) => (
                            <div className="mb-3" key={f.name}>
                                <label htmlFor={f.name} className="form-label"><strong>{f.label}</strong></label>
                                <input id={f.name} type={f.type}
                                    className={'form-control' + (hasError(f.name) ? ' is-invalid' : '')}
                                    {...formik.getFieldProps(f.name)} />
                                {hasError(f.name) && <div className="text-danger small">{formik.errors[f.name]}</div>}
                            </div>
                        ))
                    }

                    <div className="mb-3">
                        <label>
                            <input type="checkbox" name="agreeTerms"
                                checked={formik.values.agreeTerms}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} /> I agree to the terms
                        </label>
                        {hasError('agreeTerms') && <div className="text-danger small">{formik.errors.agreeTerms}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary">
                        <strong>Submit</strong>
                    </button>
                </form >
            </div >
        </>)
}