import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

const orchidSchema = Yup.object({
    name: Yup.string().trim()
        .min(3, 'Name must be at least 3 characters')
        .max(50, 'Name must be at most 50 characters')
        .required('Name is required'),
    category: Yup.string().trim().required('Category is required'),
    color: Yup.string().trim().required('Color is required'),
    origin: Yup.string().trim().required('Origin is required'),
    rating: Yup.number()
        .typeError('Rating must be a number')
        .integer('Rating must be a whole number')
        .min(1, 'Rating must be from 1 to 5')
        .max(5, 'Rating must be from 1 to 5')
        .required('Rating is required'),
    image: Yup.string().trim()
        .matches(/^https?:\/\/[^\s/$.?#][^\s]*$/i, 'Image must be a URL starting with http:// or https://')
        .required('Image is required'),
    isNatural: Yup.boolean(),
})

// Để ngoài component để không bị tạo object mới mỗi lần render
const emptyOrchid = { name: '', category: '', color: '', origin: '', rating: 5, image: '', isNatural: false }

const textFields = [
    { name: 'name', label: 'Name' },
    { name: 'category', label: 'Category' },
    { name: 'color', label: 'Color' },
    { name: 'origin', label: 'Origin' },
    { name: 'image', label: 'Image', placeholder: 'https://...' },
]

export default function OrchidForm({ title, submitLabel, initialValues = emptyOrchid, onSubmit }) {
    const formik = useFormik({
        initialValues,
        validationSchema: orchidSchema,
        onSubmit: async (values, { setStatus }) => {
            setStatus(null)
            try {
                // cast: trim chuỗi, ép rating về number, bỏ field thừa (vd: id)
                await onSubmit(orchidSchema.cast(values, { stripUnknown: true }))
            } catch (e) {
                setStatus(e.message)
            }
        },
    })

    const hasError = (name) => formik.touched[name] && formik.errors[name]

    return (
        <form className="admin-form" onSubmit={formik.handleSubmit} noValidate>
            <h2>{title}</h2>
            {formik.status && <div className="alert alert-danger">{formik.status}</div>}

            {textFields.map((f) => (
                <div className="mb-3" key={f.name}>
                    <label htmlFor={f.name} className="form-label"><strong>{f.label}</strong></label>
                    <input id={f.name} type="text" placeholder={f.placeholder}
                        className={'form-control' + (hasError(f.name) ? ' is-invalid' : '')}
                        {...formik.getFieldProps(f.name)} />
                    {hasError(f.name) && <div className="text-danger small">{formik.errors[f.name]}</div>}
                </div>
            ))}

            {formik.values.image && !formik.errors.image && (
                <img className="admin-preview" src={formik.values.image} alt="Preview" />
            )}

            <div className="mb-3">
                <label htmlFor="rating" className="form-label"><strong>Rating (1-5)</strong></label>
                <input id="rating" type="number" min={1} max={5}
                    className={'form-control' + (hasError('rating') ? ' is-invalid' : '')}
                    {...formik.getFieldProps('rating')} />
                {hasError('rating') && <div className="text-danger small">{formik.errors.rating}</div>}
            </div>

            <div className="mb-3 form-check">
                <input id="isNatural" type="checkbox" name="isNatural" className="form-check-input"
                    checked={formik.values.isNatural}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                <label htmlFor="isNatural" className="form-check-label">Natural orchid</label>
            </div>

            <div className="admin-form-actions">
                <Link to="/manage" className="btn btn-secondary">Cancel</Link>
                <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? 'Saving...' : submitLabel}
                </button>
            </div>
        </form>
    )
}
