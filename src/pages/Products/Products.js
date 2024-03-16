import React from 'react'
import { FilterMobile,FilterSidebar,ProductList } from '../../components'
import { useProduct } from '../../context/ProductContext'
export const Products = () => {
  const {
    state: { loading, error },
  } = useProduct();
  return (
    <div>
      <main className="main-wrapper">
      <FilterMobile />
      {loading ? (
        <p>Loading...</p>
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
