import React, { useState } from 'react'

function AddProduct() {

    const [productName,setProductName] =useState('')
    const [price,setPrice] = useState('')
    const [company,setCompany] =useState('')
    const [category,setCategory] =useState('')
    const auth =localStorage.getItem('user')
    const id =JSON.parse(auth)._id
    // console.log(id)

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        let result = await fetch('http://localhost:5000/add-product', {
          method: 'POST',
          body: JSON.stringify({productName,price,company,category,id}),
          headers: {
            'Content-Type': 'application/json',
            authorization:"Bearear " +JSON.parse(localStorage.getItem("token"))

          },
        })
        result = await result.json()
        if (result.productName) {
            alert("Done")                       
        } else {
            alert("incorrect details")
            
        }
      }

  return (
    <div>
    <div className="container">
        <h1>Add Products</h1>
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-25">
                    <label htmlFor="lname">Name</label>
                </div>
                <div className="col-75">
                    <input type="text" id="lname"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        name="lastname" placeholder="Your last name.." />
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    <label htmlFor="lname">Price</label>
                </div>
                <div className="col-75">
                    <input type="text" id="lname"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        name="lastname" placeholder="Your last name.." />
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    <label htmlFor="lname">Company</label>
                </div>
                <div className="col-75">
                    <input type="text" id="lname"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        name="lastname" placeholder="Your last name.." />
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    <label htmlFor="lname">Category</label>
                </div>
                <div className="col-75">
                    <input type="text" id="lname"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        name="lastname" placeholder="Your last name.." />
                </div>
            </div>

            <div className="row">
                <input type="submit" value="Submit" />
            </div>
        </form>
    </div>
</div>
  )
}

export default AddProduct