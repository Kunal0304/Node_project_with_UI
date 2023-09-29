import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ProductList() {

    const [productListItem, setProductList] = useState([])

    useEffect(() => {
        product()
    }, [])
    const product = async () => {
        let result = await fetch('http://localhost:5000/show-products', {
            headers: {
                authorization: "Bearear " + JSON.parse(localStorage.getItem("token"))
            }
        })
        result = await result.json()
        setProductList(result)
    }

    const deleterow = async (id) => {

        let result = await fetch(`http://localhost:5000/show-products/${id}`, {
            method: 'Delete',
            headers: {
                authorization: "Bearear " + JSON.parse(localStorage.getItem("token"))
            }
        })
        result = await result.json()
        if (result) {
            product()
        }

    }

    const searchProducts = async (event) => {

        if (event) {
            let result = await fetch('http://localhost:5000/search/' + event, {
                headers: {
                    authorization: "Bearear " + JSON.parse(localStorage.getItem("token"))
                }
            })
            result = await result.json()
            setProductList(result)
        } else {
            product()
        }

    }




    return (
        <>
            <input type="text" onChange={(event) => searchProducts(event.target.value)} placeholder='Search here........' width={500} />

            <table id="customers">
                <tr>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                {productListItem.length > 0 ? productListItem?.map((item, index) => <tr key={index}>
                    <td>{item.productName}</td>
                    <td>{item.company}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td><div>
                        <h3 onClick={() => deleterow(item._id)}>Delete</h3>
                        <Link to={"/update/" + item._id}>Update</Link>
                    </div></td>
                </tr>
                ) : <h1>No record found</h1>}

            </table>
        </>
    )
}

export default ProductList