import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  selectSelectedProduct,
} from "../../../store/productsSlice";
import { useRouter } from "next/router";
import Image from "next/image";

function Index() {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedProduct = useSelector(selectSelectedProduct);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (router.query.slug) {
      const id = Number(router.query.slug); // Ensure the id is a number
      dispatch<any>(fetchData(id));
    }
  };

  return (
    <div>
      {selectedProduct ? (
        <div className="container mx-auto">
          <h2 className="mt-2 mb-2 font-bold text-2xl font-Headingg text-center">
            Welcome to stackInfinte
          </h2>

          <h1>{selectedProduct.id}</h1>
          <p>{selectedProduct.description}</p>
          <div className=" ">
            <a href="#">
              {" "}
              <Image
                src={selectedProduct.image}
                height={200}
                width={200}
                className="h-56"
                alt="image"
              />
            </a>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Description: {selectedProduct.description}
            </h5>
            <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
              title : {selectedProduct.title}
            </p>
            <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
              price : {selectedProduct.price}
            </p>
            <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
              brand : {selectedProduct.brand}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Index;
