import DetailProduct from "@/components/DetailProduct";
import { FormData } from "@/context/FormContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetailProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState<FormData | null>();
  useEffect(() => {
    const storedProduct = localStorage.getItem("products");
    if (storedProduct) {
      const prod = JSON.parse(storedProduct) as FormData[];
      const find = prod.find((item) => item.id === productId);
      if (find) {
        setProduct(find);
      }
    }
  }, [productId]);
  if (!product) {
    return <div>Loadding...</div>;
  }
  return (
    <div className="w-full min-h-screen bg-slate-200 pt-4 flex justify-center items-center">
      <DetailProduct product={product} />
    </div>
  );
}

export default DetailProductPage;
