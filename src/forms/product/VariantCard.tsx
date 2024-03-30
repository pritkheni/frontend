import { Input } from "@/components/ui/input";
import { Variant, useFormContext } from "@/context/FormContext";
import { useState } from "react";

function VariantCard({ variant }: { variant: Variant }) {
  const { setFormData } = useFormContext();
  const [isExpaned, setIsExpanded] = useState(true);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const regex = /^\d*\.?\d{0,2}$/;
    console.log(
      regex.test(value) || /^\d*\.?\d{0,2}\s*-\s*\d*\.?\d{0,2}$/.test(value)
    );

    if (
      regex.test(value) ||
      /^\d*\.?\d{0,2}\s*-\s*\d*\.?\d{0,2}$/.test(value)
    ) {
      if (variant.isMaster && variant.hasSubVariant) {
        setFormData((prev) => ({
          ...prev,
          variants: prev.variants.map((item) =>
            item.varinatName === variant.varinatName
              ? {
                  ...item,
                  price: value,
                  subVariant: item.subVariant?.map((item) => ({
                    ...item,
                    price: value,
                  })),
                }
              : item
          ),
        }));
      } else if (!variant.isMaster && !variant.hasSubVariant) {
        console.log(`if else condition`);
        setFormData((prev) => ({
          ...prev,
          variants: prev.variants.map((item) =>
            item.varinatName === variant.parent
              ? {
                  ...item,
                  subVariant: item.subVariant?.map((item) =>
                    item.varinatName === variant.varinatName
                      ? { ...item, price: value }
                      : item
                  ),
                }
              : item
          ),
        }));
      } else {
        console.log(`else condition`);

        setFormData((prev) => ({
          ...prev,
          variants: prev.variants.map((item) =>
            item.varinatName === variant.varinatName
              ? {
                  ...item,
                  price: value,
                }
              : item
          ),
        }));
      }
    }
  };

  const handleOnChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    if (parseInt(value) < 0) {
      return;
    }
    if (variant.isMaster && !variant.hasSubVariant) {
      setFormData((prev) => ({
        ...prev,
        variants: prev.variants.map((item) =>
          item.varinatName === variant.varinatName
            ? ({ ...item, available: parseInt(value) } as Variant)
            : item
        ),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        variants: prev.variants.map((item) =>
          item.varinatName === variant.parent
            ? {
                ...item,
                subVariant: item.subVariant?.map((item) =>
                  item.varinatName === variant.varinatName
                    ? { ...item, available: parseInt(value) }
                    : item
                ),
              }
            : item
        ),
      }));
      setFormData((prev) => {
        const sum = prev.variants
          .find((item) => item.varinatName === variant.parent)
          ?.subVariant?.reduce((acc, current) => acc + current.available, 0);
        console.log(sum);
        if (sum) {
          return {
            ...prev,
            variants: prev.variants.map((item) =>
              item.varinatName === variant.parent
                ? { ...item, available: sum }
                : item
            ),
          };
        } else {
          return prev;
        }
      });
    }
  };
  return (
    <>
      <div
        className={`flex flex-row w-full gap-4 p-2 bg-slate-100 rounded-sm items-center ${
          !variant.isMaster ? "pl-6" : "pl-0"
        }`}
      >
        <div>
          <Input type="checkbox" />
        </div>
        <div className="bg-slate-400 rounded-md">imagelink</div>
        <div className="flex-1 flex flex-col justify-center">
          {variant.varinatName}
          {variant.subVariant ? (
            <span
              onClick={() => {
                setIsExpanded((prev) => !prev);
              }}
              className="cursor-pointer"
            >
              {variant.subVariant.length} variants
            </span>
          ) : null}
        </div>
        <div>
          <Input
            type="text"
            required={true}
            onChange={handleOnChange}
            value={variant.price}
            maxLength={24}
          />
        </div>
        <div>
          <Input
            type="number"
            required={true}
            onChange={handleOnChangeQuantity}
            disabled={variant.isMaster && variant.hasSubVariant}
            value={variant.available}
          />
        </div>
      </div>
      {isExpaned && variant.hasSubVariant
        ? variant.subVariant?.map((subvariant) => (
            <VariantCard key={subvariant.varinatName} variant={subvariant} />
          ))
        : null}
    </>
  );
}

export default VariantCard;
