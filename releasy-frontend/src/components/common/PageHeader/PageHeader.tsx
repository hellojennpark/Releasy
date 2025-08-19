// components/common/PageHeader/PageHeader.tsx
import React from "react";
import "../../../styles/components/page-header.css";

interface PageHeaderProps {
  title: string;
  description: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div className="page-header">
      <h1 className="page-title">{title}</h1>
      <p className="page-description">{description}</p>
    </div>
  );
};
