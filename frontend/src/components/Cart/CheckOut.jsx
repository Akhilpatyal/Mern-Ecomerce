import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Paypal from "./Paypal";
import { createCheckOut } from "../../redux/slices/checkOutSlice.js";
import axios from "axios";

const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [checkoutId, setCheckOutId] = useState();
  const [ShippingAdd, setShippingAdd] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  // ensure cart is loading before processing
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  },[cart,navigate]);

  const handleCheckOut = async(e) => {
    e.preventDefault();
    
    if (cart && cart.products.length > 0) {
     const res= await dispatch(createCheckOut({
      checkoutItems: cart.products,
      shippingAddress: ShippingAdd,
      paymentMethod: "paypal",
      totalPrice: cart.totalPrice,
     }))
      if (res.payload && res.payload._id) {
        setCheckOutId(res.payload._id); //set checkout id if checkout was seccessful
      }
    }
  };

  const handlePaymentSuccess =async(details) => {
   try {
    const response=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,{paymentStatus:"paid",paymentDetails:details},
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
   console.log(response);
      await handleFinalizeCheckout(checkoutId);//if payment is successful
   
   } catch (error) {
    console.error(error);
    
   }
    // navigate("/order-confirmation");
  };
  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,{},
        {
        headers:{
          Authorization:`Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      console.log(response);
      
        navigate("/order-confirmation");
         
    } catch (error) {
      console.error(error);
      
    }
  }
  if(loading)return <div>Loading Cart...</div>;
  if(error)return <div>Error: {error}</div>;
  if(!cart||cart.products.length===0)return <div>No Cart Items</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* left section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Check Out</h2>
        <form onSubmit={handleCheckOut}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={user? user.email : ""}
              disabled
              className="w-full p-2 border rounded"
            />
          </div>

          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">
                {" "}
                {/* ✅ Fixed typo here */}
                First Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                required
                value={ShippingAdd.firstName || ""} // ✅ Ensure value is always controlled
                onChange={(e) =>
                  setShippingAdd({
                    ...ShippingAdd,
                    firstName: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-gray-700">
                {" "}
                {/* ✅ Fixed typo here */}
                Last Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                required
                value={ShippingAdd.lastName || ""} // ✅ Ensure value is always controlled
                onChange={(e) =>
                  setShippingAdd({
                    ...ShippingAdd,
                    lastName: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={ShippingAdd.address}
              onChange={(e) =>
                setShippingAdd({
                  ...ShippingAdd,
                  address: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              {" "}
              {/* ✅ Fixed typo here */}
              City
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              required
              value={ShippingAdd.city || ""} // ✅ Ensure value is always controlled
              onChange={(e) =>
                setShippingAdd({
                  ...ShippingAdd,
                  city: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              {" "}
              {/* ✅ Fixed typo here */}
              Postal Code
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              required
              value={ShippingAdd.postalCode || ""} // ✅ Ensure value is always controlled
              onChange={(e) =>
                setShippingAdd({
                  ...ShippingAdd,
                  postalCode: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              value={ShippingAdd.country}
              onChange={(e) =>
                setShippingAdd({
                  ...ShippingAdd,
                  country: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={ShippingAdd.phone}
              onChange={(e) =>
                setShippingAdd({
                  ...ShippingAdd,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-wrap text-white p-2 rounded"
              >
                Continue To Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg w-full bg-black text-wrap text-white text-center p-2">
                  {" "}
                  Pay With Paypal
                </h3>
                {/*paypal component  */}
                <Paypal
                  amount={cart.totalPrice}
                  onSuccess={handlePaymentSuccess}
                  onError={(error) => alert("Payment Failed .try again", error)}
                />
              </div>
            )}
          </div>
        </form>
      </div>
      {/* Right Side */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {cart.products.map((product) => (
            <div
              key={product._id}
              className="flex items-start justify-between py-2 border-b"
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4 rounded"
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <h3 className="text-gray-500">Size:{product.size}</h3>
                  <h3 className="text-gray-500">Color:{product.color}</h3>
                </div>
              </div>
              <p className="text-xl">${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal:</p>
          <p>${cart.subtotal?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
          <p>Total</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
