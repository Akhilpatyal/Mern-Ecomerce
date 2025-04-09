import { FaMeta } from "react-icons/fa6";
import { AiFillInstagram, AiFillPhone } from "react-icons/ai";
import { RiTwitterXLine } from "react-icons/ri";
import { Link } from "react-router-dom";
const Fotter = () => {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Newletter </h3>
          <p className="text-gray-500 mb-4">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>
          <p className="font-medium text-sm text-gray-400 mb-6">Sign up and get 10% off your first order</p>
        {/* form action */}
        <form className="flex">
          <input
            type="email"
            placeholder="Enter your mail"
            className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
            required
          />
          <button
            className="bg-black text-white px-6 py-3 text-sm rounded-r-red hover:bg-gray-800 transition-all"
            type="submit"
          >
            Subscribe
          </button>
        </form>
        </div>
        {/* shop links*/}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to ="#" className="hover:text-gray-500 transition-colors" > Men Top Wear</Link>
            </li>
            <li>
              <Link to ="#" className="hover:text-gray-500 transition-colors" > Women Top Wear</Link>
            </li>
            <li>
              <Link to ="#" className="hover:text-gray-500 transition-colors" > Men Bottom Wear</Link>
            </li>
            <li>
              <Link to ="#" className="hover:text-gray-500 transition-colors" > Women bottom Wear</Link>
            </li>
          </ul>
        </div>
        {/* support links*/}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to ="#" className="hover:text-gray-500 transition-colors" > Contect Us</Link>
            </li>
            <li>
              <Link to ="#" className="hover:text-gray-500 transition-colors" >About Us</Link>
            </li>
            <li>
              <Link to ="#" className="hover:text-gray-500 transition-colors" >FAQs</Link>
            </li>
            <li>
              <Link to ="#" className="hover:text-gray-500 transition-colors" >Features</Link>
            </li>
          </ul>
        </div>
        {/* Follow Us  */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">
            Follow Us
          </h3>
          <div className="flex items-center space-x-4 mb-6">
            <a href="" target="_blank" rel="noopener norefferal" className="hover:text-gray-500"><FaMeta className="h-5 w-5"/></a>
            <a href="" target="_blank" rel="noopener norefferal" className="hover:text-gray-500"><AiFillInstagram className="h-5 w-5"/></a>
            <a href="" target="_blank" rel="noopener norefferal" className="hover:text-gray-500"><RiTwitterXLine className="h-5 w-5"/></a>
          </div>
          <p className="text-gray-500">Call Us</p>
          <p><AiFillPhone className="inline-block mr-2 "/>0987-654-321</p>
        </div>
      </div>
      {/* Footer bottom */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200pt-2">
        <p className="text-gray-500 text-sm tracking-tighter text-center">@ 2025,Developers Guy All Right Reserver </p>
      </div>
    </footer>
  );
};

export default Fotter;
