import { FormData } from "@/context/FormContext";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
type AvailableLookUp = {
  variantName?: string;
  available?: number;
};
function DetailProduct({ product }: { product: FormData }) {
  const [firstOption, setFirstOption] = useState<string[]>([]);
  const [secondOption, setSecondOption] = useState<string[]>([]);
  const [thirdOption, setThirdOption] = useState<string[]>([]);
  const [selectedFirst, setSelectedFirst] = useState<string>();
  const [selectedSecond, setSelectedSecond] = useState<string>();
  const [selectedThird, setSelectedThird] = useState<string>();
  const [firstAvailable, setFirstAvailable] = useState<AvailableLookUp[]>();
  const [secondAailable, setSecondAvailable] = useState<AvailableLookUp[]>();
  const [thirdAvailable, setThirdAvailable] = useState<AvailableLookUp[]>();
  const [quantity, setQuantity] = useState(0);
  const [maxValue, setMaxValue] = useState<number>(0);

  const [price, setPrice] = useState<string>("00.00");
  useEffect(() => {
    console.log(`=============================================`);
    console.log(maxValue);
    console.log(`=============================================`);
  }, [maxValue]);
  useEffect(() => {
    const first = product.variantOptions[0];
    const second = product.variantOptions[1];
    const third = product.variantOptions[2];
    console.log(first);
    console.log(second);
    console.log(third);

    if (first && !second && !third) {
      const firstOptions = first.options.map((item) => item.value);
      setFirstOption(firstOptions);
      setSelectedFirst(firstOptions[0]);
      const firstLookup = product.variants.map((item) =>
        item.isMaster
          ? { variantName: item.varinatName, available: item.available }
          : {}
      );
      setFirstAvailable(firstLookup);
    } else if (first && second && !third) {
      const firstOptions = first.options.map((item) => item.value);
      setFirstOption(firstOptions);
      setSelectedFirst(firstOptions[0]);
      const firstLookup = product.variants.map((item) =>
        item.isMaster
          ? { variantName: item.varinatName, available: item.available }
          : {}
      );
      setFirstAvailable(firstLookup);
      const secondOptions = second.options.map((item) => item.value);
      setSecondOption(secondOptions);
      setSelectedSecond(secondOptions[0]);
    } else {
      const firstOptions = first.options.map((item) => item.value);
      setFirstOption(firstOptions);
      setSelectedFirst(firstOptions[0]);
      const firstLookup = product.variants.map((item) =>
        item.isMaster
          ? { variantName: item.varinatName, available: item.available }
          : {}
      );
      setFirstAvailable(firstLookup);
      const secondOptions = second.options.map((item) => item.value);
      setSecondOption(secondOptions);
      setSelectedSecond(secondOptions[0]);
      const thirdOptions = third.options.map((item) => item.value);
      setThirdOption(thirdOptions);
      setSelectedThird(thirdOptions[0]);
    }
  }, [product.variantOptions, product.variants]);
  useEffect(() => {
    if (selectedFirst && !selectedSecond && !selectedThird) {
      const price = product.variants.find(
        (item) => item.varinatName === selectedFirst
      )?.price;
      if (price) {
        setPrice(parseFloat(price).toFixed(2).toString());
      }
      const max = product.variants.find(
        (item) => item.varinatName === selectedFirst
      )?.available;
      if (max) {
        if (quantity > max) {
          setQuantity(0);
        }
        setMaxValue((prev) => {
          if (prev > max) {
            return 0;
          } else {
            return max;
          }
        });
      } else {
        setQuantity(0);
        setMaxValue(0);
      }
    } else if (selectedFirst && selectedSecond && !selectedThird) {
      const price = product.variants
        .find((item) => item.varinatName === selectedFirst)
        ?.subVariant?.find(
          (item) => item.varinatName === selectedSecond
        )?.price;
      if (price) {
        setPrice(parseFloat(price).toFixed(2).toString());
      }
      const max = product.variants
        .find((item) => item.varinatName === selectedFirst)
        ?.subVariant?.find(
          (item) => item.varinatName === selectedSecond
        )?.available;
      console.log(`variant change`);
      console.log(max);

      if (max) {
        if (quantity > max) {
          setQuantity(0);
        }
        setMaxValue((prev) => {
          if (prev > max) {
            return 0;
          } else {
            return max;
          }
        });
      } else {
        setQuantity(0);
        setMaxValue(0);
      }
      const secondLookUp = product.variants
        .filter((item) => item.varinatName === selectedFirst)[0]
        .subVariant?.map(
          (item) =>
            ({
              variantName: item.varinatName,
              available: item.available,
            } as AvailableLookUp)
        );
      if (secondLookUp) {
        setSecondAvailable(secondLookUp);
      }
    } else if (selectedFirst && selectedSecond && selectedThird) {
      const price = product.variants
        .find((item) => item.varinatName === selectedFirst)
        ?.subVariant?.find(
          (item) => item.varinatName === `${selectedSecond}.${selectedThird}`
        )?.price;
      if (price) {
        setPrice(parseFloat(price).toFixed(2).toString());
      }
      const max = product.variants
        .find((item) => item.varinatName === selectedFirst)
        ?.subVariant?.find(
          (item) => item.varinatName === `${selectedSecond}.${selectedThird}`
        )?.available;
      if (max) {
        if (quantity > max) {
          setQuantity(0);
        }
        setMaxValue((prev) => {
          if (prev > max) {
            return 0;
          } else {
            return max;
          }
        });
      } else {
        setQuantity(0);
        setMaxValue(0);
      }
      const secondLookUp = product.variants
        .filter((item) => item.varinatName === selectedFirst)[0]
        .subVariant?.map(
          (item) =>
            ({
              variantName: item.varinatName.split(".")[0],
              available: item.available,
            } as AvailableLookUp)
        );
      if (secondLookUp) {
        setSecondAvailable(secondLookUp);
      }
      const thirdLookUp = product.variants
        .filter((item) => item.varinatName === selectedFirst)[0]
        .subVariant?.map(
          (item) =>
            ({
              variantName: item.varinatName.split(".")[1],
              available: item.available,
            } as AvailableLookUp)
        );
      if (thirdLookUp) {
        setThirdAvailable(thirdLookUp);
      }
    }
  }, [
    product.variants,
    quantity,
    selectedFirst,
    selectedSecond,
    selectedThird,
  ]);
  return (
    <div className="flex flex-col gap-5 items-center p-4 bg-slate-300 rounded-lg w-96">
      <h1 className="font-bold text-2xl">{product.producatName}</h1>
      <h3 className="text-xl">Rs.{price}</h3>
      <div className="flex flex-col gap-3 items-center">
        {firstOption.length >= 1 ? (
          <>
            {product.variantOptions[0].optionName}
            <div className="flex flex-wrap gap-3">
              {firstOption.map((item) => (
                <div
                  onClick={() => setSelectedFirst(item)}
                  className={`px-4 py-1 rounded-full cursor-pointer ${
                    firstAvailable?.find(
                      (lookup) => lookup.variantName === item
                    )?.available || 0 > 0
                      ? "no-underline"
                      : "line-through"
                  } ${
                    item === selectedFirst
                      ? "bg-black text-white"
                      : firstAvailable?.find(
                          (lookup) => lookup.variantName === item
                        )?.available || 0 > 0
                      ? "border border-slate-500 text-slate-500"
                      : "border border-slate-400 text-slate-400"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </>
        ) : null}
        {secondOption.length >= 1 ? (
          <>
            {product.variantOptions[1].optionName}
            <div className="flex flex-wrap gap-3">
              {secondOption.map((item) => (
                <div
                  onClick={() => setSelectedSecond(item)}
                  className={`px-4 py-1 rounded-full cursor-pointer ${
                    secondAailable?.find(
                      (lookup) => lookup.variantName === item
                    )?.available || 0 > 0
                      ? "no-underline"
                      : "line-through"
                  } ${
                    item === selectedSecond
                      ? "bg-black text-white"
                      : secondAailable?.find(
                          (lookup) => lookup.variantName === item
                        )?.available || 0 > 0
                      ? "border border-slate-500 text-slate-500"
                      : "border border-slate-400 text-slate-400"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </>
        ) : null}
        {thirdOption.length >= 1 ? (
          <>
            {product.variantOptions[2].optionName}
            <div className="flex flex-wrap gap-3">
              {thirdOption.map((item) => (
                <div
                  onClick={() => setSelectedThird(item)}
                  className={`px-4 py-1 rounded-full cursor-pointer ${
                    thirdAvailable?.find(
                      (lookup) => lookup.variantName === item
                    )?.available || 0 > 0
                      ? "no-underline"
                      : "line-through"
                  } ${
                    item === selectedThird
                      ? "bg-black text-white"
                      : thirdAvailable?.find(
                          (lookup) => lookup.variantName === item
                        )?.available || 0 > 0
                      ? "border border-slate-500 text-slate-500"
                      : "border border-slate-400 text-slate-400"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>

      <div className="flex flex-col items-center gap-2 mt-3">
        <label
          htmlFor="counter-input"
          className="block mb-1 text-base font-medium text-gray-900"
        >
          Quantity
        </label>
        <div className="relative flex items-center">
          <button
            type="button"
            id="decrement-button"
            onClick={() =>
              setQuantity((prev) => {
                const decriment = prev - 1;
                if (decriment >= 0) {
                  return decriment;
                } else {
                  return prev;
                }
              })
            }
            data-input-counter-decrement="counter-input"
            className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-2.5 h-2.5 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <input
            type="text"
            id="counter-input"
            data-input-counter
            className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
            placeholder=""
            value={quantity}
            required
          />
          <button
            type="button"
            id="increment-button"
            onClick={() =>
              setQuantity((prev) => {
                const updated = prev + 1;
                if (updated > maxValue) {
                  return prev;
                } else {
                  return updated;
                }
              })
            }
            data-input-counter-increment="counter-input"
            className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-2.5 h-2.5 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <Button className="w-full" variant="secondary">
          Add To Cart
        </Button>
        <Button disabled={maxValue <= 0} className="w-full">
          Buy it now
        </Button>
      </div>
    </div>
  );
}

export default DetailProduct;
