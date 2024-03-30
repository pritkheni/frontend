import { Button } from "@/components/ui/button";
import ProductDetail from "./ProductDetail";
import AddVariants from "./AddVariants";
import { FormData, useFormContext } from "@/context/FormContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

function AddProductForm() {
  const { formData, optionError, isForUpdate } = useFormContext();
  const navigate = useNavigate();
  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (optionError) {
          return;
        }
        if (isForUpdate) {
          console.log(`for update`);
          const storedProducts = localStorage.getItem("products");
          if (storedProducts) {
            const products = JSON.parse(storedProducts) as FormData[];
            const updatedProduct = products.map((item) =>
              item.id === formData.id ? formData : item
            );
            localStorage.setItem("products", JSON.stringify(updatedProduct));
          }
          navigate("/");
        } else {
          if (formData.variantOptions.length === 0) return;
          if (
            formData.variantOptions[0].options &&
            formData.variantOptions[0].options.length === 0
          )
            return;
          const uuid = uuidv4();
          const finalProducat = { ...formData, id: uuid };
          const storedProducts = localStorage.getItem("products");
          if (storedProducts) {
            const products = JSON.parse(storedProducts) as FormData[];
            localStorage.setItem(
              "products",
              JSON.stringify([...products, finalProducat])
            );
          } else {
            localStorage.setItem("products", JSON.stringify([finalProducat]));
          }
          // localStorage.setItem(
          //   `${finalProducat.id}`,
          //   JSON.stringify(finalProducat)
          // );
          navigate("/");
        }
      }}
    >
      <div className="w-full min-h-screen bg-slate-200 pt-4 space-y-4">
        <ProductDetail />
        <AddVariants />
        <div className="container mx-auto flex justify-end w-full ">
          <Button>{isForUpdate ? "Update" : "Save"}</Button>
        </div>
      </div>
    </form>
  );
}

export default AddProductForm;
