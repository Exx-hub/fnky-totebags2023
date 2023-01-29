import type { NextPage } from "next";
import Shop from "../components/shop";
import Product from "../models/Product";
import { IProduct } from "../types/interfaces";
import connectDb from "../utils/connectDb";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

interface HomeProps {
  products: IProduct[];
}

const Home: NextPage<HomeProps> = ({ products }) => {
  return (
    <>
      <Shop products={products} />
      <ToastContainer theme="dark" hideProgressBar />
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  await connectDb();

  const products = await Product.find();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};
