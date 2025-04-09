import { Link } from "react-router-dom";
import mensCollectionImage from "../../assets/mens-collection.webp";
import womensCollectionImage from "../../assets/womens-collection.webp";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* women collection */}
        <div className="relative flex-1">
          <img
            src={womensCollectionImage}
            alt=""
            className="w-full h-[600px] object-cover rounded"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Women Collection
            </h2>
            <Link
              to="/collections/all?gender=Women"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
        {/* men collection */}
        <div className="relative flex-1">
          <img
            src={mensCollectionImage}
            alt=""
            className="w-full h-[600px] object-cover rounded"
          />
          <div className="rounded-lg absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Men Collection
            </h2>
            <Link
              to="/collections/all?gender=Women"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
