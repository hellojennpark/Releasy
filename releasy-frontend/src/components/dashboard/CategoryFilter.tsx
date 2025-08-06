import React from "react";
import "../../styles/components/category-filter.css";

interface CategoryFilterProps {
  value: string;
  onChange: (category: string) => void;
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "data-processing", label: "Data Processing" },
  { value: "ml-training", label: "ML Training" },
  { value: "batch-jobs", label: "Batch Jobs" },
  { value: "api-tasks", label: "API Tasks" },
  { value: "scheduled-jobs", label: "Scheduled Jobs" },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="category-filter">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="category-select"
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
};
