import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { baiTapFormActions } from '../store/baiTapForm/slice'

const ProductTable = () => {
    const { productList } = useSelector((state) => state.baiTapForm)
    const dispatch = useDispatch()

    return (
        <div className="mt-5">
            <table className="table">
                <thead className="table">
                    <tr>
                        <th>Mã sinh viên</th>
                        <th>Tên sinh viên</th>
                        <th>SĐT</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {productList.map((prd) => (
                        <tr key={prd?.id}>
                            <td>{prd?.id}</td>
                            <td>{prd?.name}</td>
                            <td>{prd?.sđt}</td>
                            <td>{prd?.Email}</td>
                            <td>
                                <div className="d-flex gap-3">
                                    <button
                                        className="btn btn-success"
                                        onClick={() => {
                                            dispatch(baiTapFormActions.editProduct(prd))
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            dispatch(baiTapFormActions.deleteProduct(prd.id))
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductTable
