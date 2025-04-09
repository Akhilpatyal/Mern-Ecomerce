import { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";
const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // changes during backend integrate
  const [newArrivals,setNewArrivals]=useState([]);
   useEffect(() => {
    const fetchNewArrivals=async()=>{
      try {
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
        
      }
    }
    fetchNewArrivals();
   },[]);

  const handleMouseDown=(e)=>{
    setIsDragging(true)
    setStartX(e.pageX-scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }
  const handleMouseMove=(e)=>{
    if(!isDragging){
      return;
    }
    const x = e.pageX-scrollRef.current.offsetLeft
    const walk=x-startX
    scrollRef.current.scrollLeft=scrollLeft-walk;
  }
  const handleMouseUp=()=>{
    setIsDragging(false);
   
  }
  const handleMouseLeave=()=>{
    setIsDragging(false);
    
  }

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behaviour: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;

    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;
      setCanScrollRight(rightScrollable);
      setScrollLeft(leftScroll > 0);
    }
   
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return ()=>container.removeEventListener("scroll",updateScrollButtons);
    }
  },[newArrivals]);
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrival</h2>
        <p className="text-lg text-gray--600 mb-8">
          Discover the latest styles straight off the runway, freshly added to
          keep you on top of the fashion game.
        </p>
        {/* scroll buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            disabled={!scrollLeft}
            onClick={() => {
              scroll("left");
            }}
            className={`p-2 rounded border bg-white text-black ${
              scrollLeft
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FaAngleLeft className="text-2xl" />
          </button>
          <button
            disabled={!canScrollRight}
            onClick={() => {
              scroll("right");
            }}
            className={`p-2 rounded border bg-white text-black ${
              canScrollRight
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FaAngleRight className="text-2xl" />
          </button>
        </div>
      </div>
      {/* scrollable content */}
      <div
        ref={scrollRef}
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
          >
            <img draggable={false}
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className="w-full h-[500px] object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50-backfrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`/product/${product._id}`} className="block">
                <h4 draggable={false} className="font-medium">{product.name}</h4>
                <p className="mt-1">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
