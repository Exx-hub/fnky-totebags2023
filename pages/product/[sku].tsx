import ShopItemDetail from "../../components/shopItemDetail";
import Product from "../../models/Product";
import { IProduct } from "../../types/interfaces";
import connectDb from "../../utils/connectDb";

interface ProductDetailProps {
  product: IProduct;
}

function ProductDetail({ product }: ProductDetailProps) {
  return <ShopItemDetail product={product} />;
}

export default ProductDetail;

export const getStaticPaths = async () => {
  await connectDb();

  const products = await Product.find();

  const paths = products.map((product) => {
    return {
      params: { sku: product.sku },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context: any) => {
  const { sku } = context.params;

  await connectDb();

  const product = await Product.findOne({ sku }).lean();

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
};
