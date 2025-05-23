import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return <p>Loading....</p>;
  }
  if (error) {
    return <p>Error:{error}</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-4">
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="block shadow-2xl rounded-lg"
        >
          <div className="bg-white p-2 rounded-lg">
            <div className="w-full h-96 mb-4">
              <img
                src={product.images?.[0]?.url || "fallback.jpg"}
                alt={product.images?.[0]?.altText || product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-sm mb-2">{product.name}</h3>
            <p className="text-gray-500 font-medium text-sm tracking-tighter">
              $ {product.price}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
          alText: PropTypes.string,
        })
      ).isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default ProductGrid;
