import React, { useEffect, useState } from 'react'
import './style.css'

const Products = () => {

  const [loading, setLoading]=useState(false)
  const [products, setProducts]=useState([])
  const [count, setCount]=useState(0)
  const [disabledButton, setDisabledButton]=useState(false)

async function fetchProducts() {

  try {
    setLoading(true)
    const response= await fetch(`https://dummyjson.com/products?limit=20&skip=${count ===0 ? 0 : count * 20}`)
    const result= await response.json()
    if (result && result.products && result.products.length){
      setProducts((prevProducts)=>[...prevProducts,...result.products])
      setLoading(false)
    }
    
  } catch (error) {
    console.log(error.message)
    setLoading(false)
    
  }
  
}

  useEffect(()=>{
    fetchProducts();

  }, [count]);

  //this will disable the load more button once the limit of 100 is reached

  useEffect(()=>{
    if(products && products.length === 100) setDisabledButton(true)
  }, [products]);


  if(loading){
    return <div>Loading....please wait</div>
  };

  return (
    <div className='products-wrapper'>
      <h1 className="text">View List of Products!!!</h1>
      <div className='product-container'>{
        products && products.length? products.map((product,index)=><div className='products' key={index}>
          <img src={product.thumbnail} alt={product.title} />
          <p>{product.title}</p>

        </div>)
        
        : null
}</div>
<div className='load-more'><button disabled={disabledButton} onClick={()=>setCount(count + 1)} >Load More Products
  </button>
{
//once the limit is reached, the message will be displayed
disabledButton ? <p className='red'>You have reached the limit...you can't load more</p>: null}  
  </div>
    </div>
  )
}

export default Products