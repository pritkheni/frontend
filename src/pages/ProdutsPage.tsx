import ProductCard from "@/components/ProductCard";
import { FormData } from "@/context/FormContext";
import { useEffect, useState } from "react";

function ProdutsPage() {
  const [products, setProducats] = useState<FormData[] | null>();
  const handledelete = (id: string) => {
    console.log(id);
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const prods = JSON.parse(storedProducts) as FormData[];
      const updated = prods.filter((item) => item.id !== id);
      localStorage.setItem("products", JSON.stringify(updated));
      setProducats(updated);
    }
    // const removed = products?.filter((item) => item !== id);
    // localStorage.setItem("products", JSON.stringify(products));
    // localStorage.removeItem(id);
    // setProducats(removed);
  };
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const prods = JSON.parse(storedProducts) as FormData[];
      console.log("===============================");
      console.log(prods);
      setProducats(prods);
    }
  }, []);
  if (!products || products.length <= 0) {
    return (
      <div className="w-full min-h-screen bg-slate-200 flex justify-center items-center">
        <p className="font-bold text-5xl">No Producat Found</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-200 flex flex-col items-center p-4">
      {products.map((item) => (
        <ProductCard product={item} deleteProduct={handledelete} />
      ))}
    </div>
  );
}

export default ProdutsPage;
