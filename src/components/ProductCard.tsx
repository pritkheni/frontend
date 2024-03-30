import { FormData } from "@/context/FormContext";
import { Input } from "./ui/input";
import { Eye, FileUp, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProductCard({
  product,
  deleteProduct,
}: {
  product: FormData;
  deleteProduct(id: string): void;
}) {
  const navigator = useNavigate();
  if (!product) {
    return (
      <div role="status" className="w-full animate-pulse">
        <div className="h-20 bg-gray-200 rounded-full w-full mb-4"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  return (
    <div className="h-20 bg-gray-500 rounded-sm w-full mb-4 flex justify-between items-center px-2 gap-4">
      <div>
        <Input type="checkbox" />
      </div>
      <div className="h-50 w-50 rounded-xl bg-slate-300">
        <img className="h-full w-full p-4" alt="img" />
      </div>
      <div className="flex-1">
        {product.producatName} {` => `} {product.variants[0].available} in stock
      </div>
      <div className="flex gap-2">
        <Eye
          className="cursor-pointer"
          onClick={() => navigator(`/product/${product.id}`)}
          size={20}
        />
        <Trash
          onClick={() => deleteProduct(product.id)}
          className="cursor-pointer"
          size={20}
        />
        <FileUp
          onClick={() => navigator(`/updateProduct/${product.id}`)}
          className="cursor-pointer"
          size={20}
        />
      </div>
    </div>
  );
}

export default ProductCard;
