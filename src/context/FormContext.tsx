import React, { createContext, useContext, useEffect, useState } from "react";

const FromContext = createContext<ApiType | null>(null);
// eslint-disable-next-line react-refresh/only-export-components
export const useFormContext = () => {
  const context = useContext(FromContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

interface ApiType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setOptionError: React.Dispatch<React.SetStateAction<boolean>>;
  optionError: boolean;
  isForUpdate?: boolean;
  calCulateVariant: () => void;
}

export type VariantOption = {
  id: string;
  optionName: "Size" | "Color" | "Material";
  options: {
    id: string;
    value: string;
  }[];
};
export type Variant = {
  imageLink?: string;
  varinatName: string;
  price: string;
  parent: string;
  available: number;
  subVariant?: Variant[];
  isMaster: boolean;
  hasSubVariant: boolean;
};
export type FormData = {
  id: string;
  producatName: string;
  productDescription: string;
  variantOptions: VariantOption[];
  variants: Variant[];
};

function crossProduct(arr1: string[], arr2: string[]): string[] {
  return arr1.flatMap((color) =>
    arr2.map((material) => `${color}.${material}`)
  );
}
export const FormContextProvider = ({
  children,
  isForUpdate = false,
  id,
}: {
  children: React.ReactNode;
  isForUpdate?: boolean;
  id?: string;
}) => {
  const [formData, setFormData] = useState<FormData>({
    id: "",
    producatName: "",
    productDescription: "",
    variantOptions: [],
    variants: [],
  });
  const [optionError, setOptionError] = useState(false);
  const calCulateVariant = () => {
    console.log(`calculate value`);
    setFormData((prev) => {
      if (prev.variantOptions.length === 0) {
        return {
          ...prev,
          variants: [],
        };
      }
      const first = prev.variantOptions[0];
      const second = prev.variantOptions[1];
      const third = prev.variantOptions[2];
      let master: Variant[] = [];

      if (first && !second && !third) {
        master = first.options.map((option) => {
          const masterVariant: Variant = {
            available: 0,
            price: "0",
            varinatName: option.value,
            parent: "",
            isMaster: true,
            hasSubVariant: false,
          };
          return masterVariant;
        });
      } else if (first && second && !third) {
        const subVariants = second.options.map((option) => {
          const subVariant: Variant = {
            available: 0,
            isMaster: false,
            parent: "",
            hasSubVariant: false,
            price: "0",
            varinatName: option.value,
          };
          return subVariant;
        });
        master = first.options.map((option) => {
          const masterVariant: Variant = {
            available: 0,
            price: "0",
            parent: "",
            varinatName: option.value,
            isMaster: true,
            hasSubVariant: true,
            subVariant: subVariants.map(
              (item) => ({ ...item, parent: option.value } as Variant)
            ),
          };
          return masterVariant;
        });
      } else {
        const secondOptions = second.options.map((option) => option.value);
        const thirdOptions = third.options.map((option) => option.value);
        const crossProductOfitem = crossProduct(secondOptions, thirdOptions);
        const subVariants = crossProductOfitem.map((option) => {
          const subVariant: Variant = {
            available: 0,
            isMaster: false,
            hasSubVariant: false,
            parent: "",
            price: "0",
            varinatName: option,
          };
          return subVariant;
        });
        master = first.options.map((option) => {
          const masterVariant: Variant = {
            available: 0,
            price: "0",
            parent: "",
            varinatName: option.value,
            isMaster: true,
            hasSubVariant: true,
            subVariant: subVariants.map(
              (item) => ({ ...item, parent: option.value } as Variant)
            ),
          };
          return masterVariant;
        });
      }
      if (master) {
        return {
          ...prev,
          variants: master,
        };
      } else {
        return prev;
      }
    });
  };
  useEffect(() => {
    if (isForUpdate && id) {
      const stroredProduct = localStorage.getItem("products");
      if (stroredProduct) {
        const prod = JSON.parse(stroredProduct) as FormData[];
        const finded = prod.find((item) => item.id === id);
        if (finded) {
          setFormData(finded);
        }
      }
    }
  }, [id, isForUpdate]);

  return (
    <FromContext.Provider
      value={{
        formData,
        setFormData,
        calCulateVariant,
        setOptionError,
        optionError,
        isForUpdate,
      }}
    >
      {children}
    </FromContext.Provider>
  );
};
