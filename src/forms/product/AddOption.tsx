import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "@/context/FormContext";
import { useDebounce } from "@/hooks/debounceInput";
import { CirclePlus, GripVertical, Trash } from "lucide-react";
import React, { useCallback, useEffect } from "react";
import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function AddOption({
  id,
  value,
  parentId,
}: {
  id: string;
  value: string;
  parentId: string;
}) {
  const { formData, setFormData, setOptionError, calCulateVariant } =
    useFormContext();
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState<string>();

  const options = useMemo(() => {
    return formData.variantOptions
      .find((item) => item.id === parentId)
      ?.options.map((item) => (item.id === id ? "" : item.value.toLowerCase()));
  }, [formData.variantOptions, id, parentId]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 8 || e.key === "Backspace") {
      console.log("Back key pressed while in input field");
      console.log(inputValue);
      console.log(!inputValue);
      if (!inputValue) {
        if (id !== "rendom") {
          if (error) {
            setOptionError(false);
            setError("");
          }
          deletedCurrent();
        }
      }
    }
  };
  useEffect(() => {
    setInputValue(value);
  }, [value, id]);
  const handleChange = (newValue: string) => {
    if (!newValue) {
      console.log(`empty value`);
      return;
    }
    const alreadyTheir = options?.find(
      (item) => item === newValue.toLowerCase()
    );
    if (alreadyTheir) {
      console.log(`set error`);
      setError("Value Already exist");
      setOptionError(true);
      return;
    }
    if (id === "rendom") {
      console.log(`add new value`);
      setFormData((prev) => {
        console.log(`try to add data this is previous form data`);
        console.log(prev);
        const uuid = uuidv4();
        return {
          ...prev,
          variantOptions: prev.variantOptions.map((item) =>
            item.id === parentId
              ? {
                  ...item,
                  options: [...item.options, { id: uuid, value: newValue }],
                }
              : item
          ),
        };
      });
      calCulateVariant();
    } else {
      setFormData((prev) => {
        console.log(`try to update data this is previous form data`);
        console.log(prev);
        return {
          ...prev,
          variantOptions: prev.variantOptions.map((item) =>
            item.id === parentId
              ? {
                  ...item,
                  options: item.options.map((item) =>
                    item.id === id ? { ...item, value: newValue } : item
                  ),
                }
              : item
          ),
        };
      });
      calCulateVariant();
    }
  };
  const optimizedFn = useDebounce(handleChange, 200);

  const deletedCurrent = useCallback(() => {
    setFormData((prev) => {
      const options = prev.variantOptions.map((item) =>
        item.id === parentId
          ? { ...item, options: item.options.filter((item) => item.id !== id) }
          : item
      );
      console.log(options);
      if (!options) {
        return prev;
      } else {
        return { ...prev, variantOptions: options };
      }
    });
    calCulateVariant();
  }, [calCulateVariant, id, parentId, setFormData]);

  return (
    <>
      {/* <span>{`${id} - ${value} - ${parentId}`}</span> */}
      <div className="flex justify-between items-center gap-8 pl-16 pr-4 pt-6 pb-3">
        <GripVertical size={20} color="white" />
        <div className="flex-1">
          <Label htmlFor="optionname" className="text-white pb-3">
            Option Value
          </Label>
          <Input
            id="optionname"
            type="text"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (!e.target.value) {
                setError("please add value first");
                if (id !== "random") {
                  setOptionError(true);
                }
              } else {
                setError("");
                setOptionError(false);
              }
              setInputValue(e.target.value);
              optimizedFn(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <p className={`text-red-300 h-5`}>{error}</p>
        </div>
        {!value ? (
          <CirclePlus
            onClick={() => {
              console.log("clicke on" + id);
            }}
            size={20}
            color="white"
          />
        ) : (
          <Trash onClick={() => deletedCurrent()} size={20} color="white" />
        )}
      </div>
    </>
  );
}

export default AddOption;
