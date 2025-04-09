import { Link } from "react-router-dom"
import feature from "../../assets/featured.webp"
const FeatureCollection = () => {
  return (
   <section className="py-6 px-4 lg:px-0">
    <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-100 rounded-3xl">
        {/* left content */}
        <div className="lg:w-1/2 p-8 text-center lg:y:text-left">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Comfort and Style</h2>
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Apparel made for everyday life
        </h2>
        <p className="text-lg text-gray-600 mb-6">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo eius beatae fugit sint aperiam commodi deserunt consequatur quo obcaecati. Quo quisquam velit numquam temporibus hic sequi! Ad accusantium veniam obcaecati?
        </p>
        <Link to="/collections/all"
        className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800"
        >Shop Now</Link>
        </div>
        {/* right content */}
        <div className="lg:w-1/2">
        <img src={feature} alt="Featured Collection" className="w-full h-full object-cover lg:rounded-br-3xl" />
        </div>
    </div>

   </section>
  )
}

export default FeatureCollection