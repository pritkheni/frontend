import { useFormContext } from "@/context/FormContext";
import { v4 as uuidv4 } from "uuid";
import VariantOptionSingle from "./VariantOptionSingle";
import VariantCard from "./VariantCard";

function AddVariants() {
  const { formData, setFormData } = useFormContext();
  const handleAddVariant = () => {
    const uuid = uuidv4();
    if (formData.variantOptions.length <= 2) {
      setFormData((prev) => ({
        ...prev,
        variantOptions: [
          ...prev.variantOptions,
          { id: uuid, optionName: "Size", options: [] },
        ],
      }));
    }
  };
  return (
    <div className="container rounded-lg bg-white mx-auto p-4">
      <div className="w-full flex justify-between mb-10">
        <div className="font-bold">Variant</div>
        <div
          onClick={handleAddVariant}
          className="text-blue-600 cursor-pointer"
        >
          Add variant
        </div>
      </div>
      {formData.variantOptions.map((item) => (
        <VariantOptionSingle key={item.id} variantOption={item} />
      ))}
      {formData.variants.length
        ? formData.variants.map((item) => <VariantCard variant={item} />)
        : null}
    </div>
  );
}

export default AddVariants;
