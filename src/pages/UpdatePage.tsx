import { FormContextProvider } from "@/context/FormContext";
import AddProductForm from "@/forms/product/AddProductForm";
import { useParams } from "react-router-dom";
function UpdatePage() {
  const { productId } = useParams();

  return (
    <FormContextProvider id={productId} isForUpdate={true}>
      <AddProductForm />
    </FormContextProvider>
  );
}

export default UpdatePage;
