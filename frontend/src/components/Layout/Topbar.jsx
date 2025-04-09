import { FaMeta } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { RiTwitterXLine } from "react-icons/ri";
const Topbar = () => {
  return (
    <div className="bg-rabbit-red text-white">
      <div className="container mx-auto flex justify-between items-center py-3">
        <div className=" hidden md:flex items-center space-x-4">
          <a href="" className="hover:text-gray-300">
            <FaMeta className="h-4 w-5" />
          </a>
          <a href="" className="hover:text-gray-300">
            <AiFillInstagram className="h-4 w-5" />
          </a>
          <a href="" className="hover:text-gray-300">
            <RiTwitterXLine className="h-4 w-5" />
          </a>
        </div>
        <div className="text-sm text-center flex-grow">
            <span>We shipped world wide - Fast and Reliable Shipping</span>
        </div>
        <div className="text-sm hidden md:block">
            <a href="tel:+9876543210" className="hover:text-gray-300">+91 9876543210</a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
