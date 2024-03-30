import { FormContextProvider } from "@/context/FormContext";
import AddProductForm from "@/forms/product/AddProductForm";

function AddProd() {
  return (
    <FormContextProvider>
      <AddProductForm />
    </FormContextProvider>
  );
}

export default AddProd;
