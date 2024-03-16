import React from 'react'
//import { FilterMobile,FilterSidebar,ProductList } from '../../components'
import { TailSpin } from "react-loader-spinner";
import { FilterSidebar, ProductList } from "../../components";
import { useProduct } from '../../context/ProductContext'
export const Products = () => {
  const {
    state: { loading, error },
  } = useProduct();
  return (
    <div>
      <main className="main-wrapper">
    
      {loading ? (
        //<p>Loading...</p>
        <TailSpin color="#2563eb" height={80} width={80} className="loader" />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <section className="products-section products-container">
            <FilterSidebar />
            <ProductList />
          </section>
        </>
      )}
    </main>
    </div>
  )
}
