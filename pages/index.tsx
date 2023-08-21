import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Product, fetchProducts, selectProducts } from "../store/productsSlice";
import Link from "next/link";
import CustomButton from "../components/Button/CustomButton";
import Image from "next/image";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const products: Product[] = useSelector(selectProducts);

  console.log(products, "products");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products?.map((item: Product) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="relative">
              <Link href={`/selecteditem/${item.id}`}>
                <Image
                  src={item.image}
                  width={200}
                  height={200}
                  className="w-full h-56 object-cover"
                  alt="image"
                />
              </Link>
            </div>
            <div className="p-4">
              <h5 className="mb-2 text-xl font-bold text-gray-900">
                {item.title}
              </h5>
              <p className="mb-1 text-gray-700">{item.description}</p>
              <p className="mb-1 text-gray-700">Price: {item.price}</p>
              <p className="mb-1 text-gray-700">Brand: {item.brand}</p>
            </div>
            <div className="flex justify-between items-center px-4 py-2 bg-blue-700">
              <Link
                className="text-white font-medium"
                href={`/selecteditem/${item.id}`}
              >
                View Details
              </Link>
              <CustomButton />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
