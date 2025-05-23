import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails, updateProduct } from "../../redux/slices/productSlice";
import axios from "axios";

const EditProductPage = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {id}=useParams();
  const {selectProduct, loading,error}=useSelector((state)=>state.products);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    size: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [ ],
  });

  const [uploading,setUploding]=useState(false);
  useEffect(()=>{
if (id) {
  dispatch(fetchProductDetails(id));
}
  },[dispatch,id]);
  useEffect(() => {
  if(selectProduct){
    setProductData(selectProduct);
  }
  }, [selectProduct])

  const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log(productData);
    dispatch(updateProduct({id, productData}));
    navigate("/admin/products");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const formData=new FormData();
    formData.append("image",file);
    try {
      setUploding(true);
      const {data}=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers:{"Content-Type":"multipart/form-data"},
        }
      );
      setProductData((prevData)=>({
        ...prevData,
        images:[...prevData.images,{url:data.imageUrl,altText:""}],
      }))
      setUploding(false);
    } catch (error) {
      console.error(error);
      setUploding(false);
      
    }
  };
 
  if(loading)return <p>loading....</p>
  if(error)return <p>Error.... {error}</p>

  return (
    <div className="max-w-5xl mx-auto shadow md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block font-medium mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={4}
            required
          />
        </div>
        {/* price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* Count in stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count In Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        {/* sku */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        {/* sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Sizes(comma-separated)
          </label>
          <input
            type="text"
            name="size"
            value={productData.size.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                size: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Colors(comma-separated)
          </label>
          <input
            type="text"
            name="colors"
            value={productData.colors.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Images Uploads */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 ">Upload Image</label>
          <input type="file" onChange={handleImageUpload} />
          {uploading && <p>Uploading Image....</p>}
          <div className="flex gap-4 mt-4">
            {productData.images.map((images, index) => (
              <div key={index}>
                <img
                  src={images.url}
                  alt={images.altText || "Product Images"}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md transition-colors hover:bg-green-600 font-semibold"
        >
          Update Project
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
