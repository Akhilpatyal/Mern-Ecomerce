import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { GiCrossMark } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProductsByFilters, setFilter } from "../../redux/slices/productSlice";
const SearchBar = () => {
  // usestate
  const [searchItems, setSearchItems] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleSearchToggle = () => {    
    setIsOpen(!isOpen);
  }
  const handleSearch = (e) => { 
      e.preventDefault();
      // console.log(`Search value : ${searchItems}`);
      dispatch(setFilter({search:searchItems}));
      dispatch(fetchProductsByFilters({search:searchItems}));
      navigate(`/collections/all?search=${searchItems}`);
      setIsOpen(false);
  }
  return (
    <div className={`flex items-center w-full justify-center translate-all duration-300 ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}`}>
      {isOpen ? (
        <form onSubmit={handleSearch} className="relative w-full flex items-center justify-center">
            <div className="relative w-1/2">
           
            <input type="text" 
            placeholder="Search"
            value={searchItems}
            onChange={(e) => setSearchItems(e.target.value)}
            className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            />
            {/* search icon */}
            <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"><GoSearch className="h-6 w-6" /></button>
            </div>
            {/* close icon */}
            <button onClick={handleSearchToggle} type="button" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
            <GiCrossMark className="h-6 w-6" />
            </button>
        </form>
      ):(
        <button onClick={handleSearchToggle}>
          <GoSearch className="h-6 w-6" />
        </button>)
      }
    </div>
  );
};

export default SearchBar;
