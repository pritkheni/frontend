// import { VariantOption, useFormContext } from "@/context/FormContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { VariantOption, useFormContext } from "@/context/FormContext";
import { GripVertical, Trash } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AddOption from "./AddOption";

function VariantOptionSingle({
  variantOption,
}: {
  variantOption: VariantOption;
}) {
  const { formData, setFormData, calCulateVariant } = useFormContext();
  const [edit, setEdit] = useState(true);
  // const [currentOptions, setCurrentOptions] = useState<
  //   { id: string; value: string }[]
  // >([{ id: "null", value: "" }]);
  const [selectionError, setSelectionError] = useState("");
  const currentOptions = useMemo(() => {
    const options = formData.variantOptions.find(
      (item) => item.id === variantOption.id
    )?.options;
    if (options) {
      return [...options, { id: "rendom", value: "" }];
    } else {
      return [{ id: "rendom", value: "" }];
    }
  }, [formData.variantOptions, variantOption.id]);
  console.log(`render variant - ${variantOption.optionName}`);

  const handleDeleteOption = () => {
    setFormData((prev) => ({
      ...prev,
      variantOptions: prev.variantOptions.filter(
        (item) => item.id !== variantOption.id
      ),
    }));
    calCulateVariant();
  };
  useEffect(() => {
    const option = formData.variantOptions
      .filter((item) => item.id !== variantOption.id)
      .find((item) => item.optionName === variantOption.optionName);
    console.log("Validation take for =>" + variantOption.id);
    console.log("Validation take for =>" + variantOption.optionName);
    console.log(option);
    if (option) {
      setSelectionError("Please Select Valid Option");
    } else {
      setSelectionError("");
    }
  }, [formData.variantOptions, variantOption]);
  const handlePosition = (position: string) => {
    setFormData((prev) => ({
      ...prev,
      variantOptions: prev.variantOptions.map((item) =>
        item.id === variantOption.id
          ? ({ ...item, optionName: position } as VariantOption)
          : item
      ),
    }));
  };
  if (!edit) {
    return (
      <div className="bg-slate-500 rounded-md w-full p-4 my-4 flex justify-between gap-4">
        <div className="pt-4">
          <GripVertical size={20} color="white" />
        </div>
        <div className="flex-1 flex flex-col">
          <span className="text-white">{variantOption.optionName}</span>
          <div className="flex flex-row w-full flex-wrap gap-1">
            {variantOption.options.map((item) => (
              <div
                key={item.id}
                className="py-1 px-4 my-1 rounded-full bg-slate-100"
              >
                {item.value}
              </div>
            ))}
          </div>
        </div>
        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            setEdit((prev) => !prev);
          }}
          variant="outline"
        >
          Edit
        </Button>
      </div>
    );
  }
  return (
    <div className="bg-slate-500 rounded-md w-full p-4 my-4">
      {/* <span>{JSON.stringify(formData)}</span>
      <div>{`============================================================`}</div>
      <span>{JSON.stringify(currentOptions)}</span> */}
      <div className="flex justify-between items-center gap-8 p-4">
        <div className="pt-4">
          <GripVertical size={20} color="white" />
        </div>
        <div className="flex-1">
          <span className="text-white">Option name</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full text-left">
                {variantOption.optionName}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuRadioGroup
                value={variantOption.optionName}
                onValueChange={handlePosition}
              >
                <DropdownMenuRadioItem value="Size">Size</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Color">
                  Color
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Material">
                  Material
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <p
            className={`text-red-500 ${
              selectionError ? "visible" : "invisible"
            }`}
          >
            error text
          </p>
        </div>
        <Trash onClick={handleDeleteOption} size={20} color="white" />
      </div>
      {currentOptions.map((item) => (
        <AddOption
          id={item.id}
          value={item.value}
          parentId={variantOption.id}
        />
      ))}
      <Button
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault();
          setEdit((prev) => !prev);
        }}
        className="ml-16 mt-6"
      >
        Done
      </Button>
    </div>
  );
}

export default VariantOptionSingle;
