import { useEffect, useState } from "react";

export default function CategorySelect(props) {
  const [currentCategory, setCurrentCategory] = useState("tutti");

  useEffect(() => {
    props.onCategoryChange(currentCategory);
  }, [props, currentCategory]);

  function sortZA(a, b) {
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    return 0;
  }

  function onChangeHandle(value) {
    setCurrentCategory(value);
  }

  return (
    <select
      value={currentCategory}
      onChange={(e) => onChangeHandle(e.target.value)}
    >
      <option value="tutti">Tutti</option>
      {props.categoryList.length > 1 &&
        props.categoryList
          .sort((a, b) => sortZA(a.slug, b.slug))
          .map((category) => {
            return (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            );
          })}
    </select>
  );
}
