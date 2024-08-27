/** @format */

import { useEffect, useState } from "react";

const classCheckbox: string[] = ["item", "smooth"];
const classDatePicker: string[] = ["DayPicker-Day"];
const classRemoveProduct: string[] = ["fa", "fa-times"];
const classImageProductSet: string[] = ["image-product-productset"];
const classClose: string[] = ["close"];
const classPulldown: string[] = ["select-text"];
const classTime: string[] = ["select-box-time"];
// const classUpload: string[] = ['upload'];
const classInputBusinessCard: string[] = ["input-normal"];
const classDelete: string[] = ["delete"];
const checkClasses = [
  classCheckbox,
  classDatePicker,
  classRemoveProduct,
  classImageProductSet,
  classClose,
  classPulldown,
  // classUpload,
  classInputBusinessCard,
  classDelete,
];

const useDetectFormChange = (
  formId: string,
  deps?: any[],
  addCheckClass: string[][] = []
): [boolean, (boolean: any) => any] => {
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [valueBeforeChange, setValueBeforeChange] = useState();

  const detectChangeInput = (event: any) => {
    if (!isChanged) {
      const getClass: string = event.target.className;
      if (classInputBusinessCard.every((_class) => getClass.includes(_class))) {
        setTimeout(
          () => setIsChanged(event.target.value !== valueBeforeChange),
          100
        );
      } else if (classPulldown.every((_class) => getClass.includes(_class))) {
        setTimeout(
          () => setIsChanged(event.target.innerText !== valueBeforeChange),
          100
        );
      } else {
        setTimeout(() => setIsChanged(true), 100);
      }
    }
  };

  const detectClickItem = (event: any) => {
    if (!isChanged) {
      const getClass: string = event.target.className;
      if (classInputBusinessCard.every((_class) => getClass.includes(_class))) {
        setValueBeforeChange(event.target.value);
      } else if (classPulldown.every((_class) => getClass.includes(_class))) {
        const classParentParent: string =
          event.target?.parentElement?.parentElement?.className;
        if (
          classParentParent &&
          classTime.every((_class) => classParentParent.includes(_class))
        ) {
          setTimeout(() => setIsChanged(true), 100);
        } else {
          setValueBeforeChange(event.target.innerText);
        }
      } else {
        const checkChange = [...checkClasses, ...addCheckClass].some(
          (_classes: string[]) => {
            return _classes.every((_class) => getClass.includes(_class));
          }
        );
        if (checkChange) {
          setTimeout(() => setIsChanged(true), 100);
        }
      }
    }
  };

  useEffect(() => {
    const formInput = document.getElementById(formId);
    if (formInput) {
      formInput.addEventListener("input", detectChangeInput);
      formInput.addEventListener("mousedown", detectClickItem);
    }
    return () => {
      if (formInput) {
        formInput.removeEventListener("input", detectChangeInput);
        formInput.removeEventListener("mousedown", detectClickItem);
      }
    };
  }, deps || []);

  return [isChanged, setIsChanged];
};

export { useDetectFormChange };
