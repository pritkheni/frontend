import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "@/context/FormContext";

function ProductDetail() {
  const { setFormData, formData } = useFormContext();
  return (
    <div className="w-full bg-white container mx-auto p-4 rounded-md space-y-4">
      <div>
        <Label htmlFor="productName">Product Name</Label>
        <Input
          id="productName"
          type="text"
          placeholder="Enter product name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            console.log(e.target.value);
            setFormData((prev) => ({
              ...prev,
              producatName: e.target.value,
            }));
          }}
          value={formData.producatName}
          required={true}
          min={1}
          max={50}
        />
      </div>
      <div>
        <Label htmlFor="description">Product Description</Label>
        <Input
          id="description"
          type="text"
          placeholder="Enter product description"
          value={formData.productDescription}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            console.log(e.target.value);
            setFormData((prev) => ({
              ...prev,
              productDescription: e.target.value,
            }));
          }}
          required={true}
          min={1}
          max={100}
        />
      </div>
    </div>
  );
}

export default ProductDetail;
