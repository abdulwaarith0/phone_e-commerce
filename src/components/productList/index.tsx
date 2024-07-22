import { useContext } from 'react';
import Title from '../title';
import { ProductContext } from '../../context/Context';
import Products from '../products';


const ProductList: React.FC = () => {
  const { products } = useContext(ProductContext);

  return (
    <>
      <div className="py-5">
        <div className="container">
          <Title name="our" title="products" />
          <div className="row">
            {products.map((product) => (
              <Products key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;