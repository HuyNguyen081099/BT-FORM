import React, { useEffect, useState } from 'react'
// import { flushSync } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { baiTapFormActions } from '../store/baiTapForm/slice'

const ProductForm = () => {
    const [formValue, setFormValue] = useState()
    const [formError, setFormError] = useState()

    const { productEdit } = useSelector((state) => state.baiTapForm)
    console.log('productEdit: ', productEdit)

    const dispatch = useDispatch()

    const validate = (element) => {
        const { validity, minLength, title, value } = element
        console.log('validity: ', validity)

        const { valueMissing, tooShort, patternMismatch } = validity

        let mess = ''

        if (valueMissing) {
            mess = `Vui lòng nhập ${title}`
        } else if (tooShort || value.length < minLength) {
            mess = `Vui lòng nhập ${title} tối thiểu ${minLength} ký tự`
        } else if (patternMismatch) {
            mess = `Vui lòng nhập đúng ${title}`
        }
        return mess
    }

    //currying function
    const handleFormValue = () => (ev) => {
        const { name, value } = ev.target
        let mess = validate(ev.target)


        setFormError({
            ...formError,
            [name]: mess,
        })

        setFormValue({
            ...formValue,
            [name]: value,
        })
    }

    useEffect(() => {

        if (productEdit) {
            setFormValue(productEdit)
        }
    }, [productEdit])

    console.log('RENDER')
    return (
        <div>

            <form
                noValidate
                onSubmit={(ev) => {
                    ev.preventDefault()

                    const elements = document.querySelectorAll('input')
                    console.log('elements: ', elements)

                    let errors = {}
                    elements.forEach((ele) => {
                        const { name } = ele
                        errors[name] = validate(ele)
                    })
                    setFormError(errors)
                    let isFlag = false
                    for (let key in errors) {
                        if (errors[key]) {
                            isFlag = true
                            break
                        }
                    }
                    if (isFlag) return

                    if (!productEdit) {
                        dispatch(baiTapFormActions.addProduct(formValue))
                    } else {
                        dispatch(baiTapFormActions.updateProduct(formValue))
                    }

                    console.log('submit')
                }}
            >
                <h2 className="p-4 bg-dark text-white">Thông tin sinh viên</h2>

                <div className="mt-3 row">
                    <div className="col-6">
                        <p>Mã sinh viên</p>
                        <input
                            type="text"
                            className="form-control"
                            name="id"
                            title="Mã sinh viên"
                            disabled={!!productEdit}
                            value={formValue?.id || ''}
                            required
                            minLength={5}
                            maxLength={10}
                            onChange={handleFormValue()}
                        />
                        {formError?.id && <p className="text-danger">{formError?.id}</p>}
                    </div>
                    <div className="col-6">
                        <p>Tên sinh viên</p>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            title="Tên sinh viên"
                            value={formValue?.name || ''}
                            onChange={handleFormValue()}
                            required
                            minLength={10}
                        />
                        {formError?.name && <p className="text-danger">{formError?.name}</p>}
                    </div>
                    <div className="col-6">
                        <p>SĐT</p>
                        <input
                            type="text"
                            className="form-control"
                            name="sđt"
                            title="sđt"
                            value={formValue?.sđt || ''}
                            onChange={handleFormValue()}
                            required
                            pattern="^[0-9]+$"
                        />
                        {formError?.sđt && <p className="text-danger">{formError?.sđt}</p>}
                    </div>
                    <div className="col-6">
                        <p>Email</p>
                        <input
                            type="text"
                            className="form-control"
                            name="Email"
                            title="Email"
                            value={formValue?.Email || ''}
                            onChange={handleFormValue()}
                        />
                    </div>
                </div>

                <div className="mt-3 d-flex gap-3">
                    {productEdit ? (
                        <button className="btn btn-info">Update</button>
                    ) : (
                        <button className="btn btn-success">Create</button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default ProductForm
