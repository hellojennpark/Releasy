import React, { useState, useEffect } from "react";
import { PipelineHistoryFilters } from "../../services/types/pipeline";
import {
  fetchServers,
  fetchCategories,
  getStatusOptions,
} from "../../services/api/history";
import "../../styles/history.css";

interface FilterOption {
  id: string;
  name: string;
}

interface HistoryFilterProps {
  filters: PipelineHistoryFilters;
  onFiltersChange: (filters: Partial<PipelineHistoryFilters>) => void;
  onReset: () => void;
}

const HistoryFilter: React.FC<HistoryFilterProps> = ({
  filters,
  onFiltersChange,
  onReset,
}) => {
  const [serverOptions, setServerOptions] = useState<FilterOption[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<FilterOption[]>([]);
  const [statusOptions] = useState<FilterOption[]>(getStatusOptions());
  const [isLoading, setIsLoading] = useState(true);

  const [localFilters, setLocalFilters] = useState({
    dateStart: filters.dateStart,
    dateEnd: filters.dateEnd,
    categories: filters.categories,
    servers: filters.servers,
    statuses: filters.statuses,
  });

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [servers, categories] = await Promise.all([
          fetchServers(),
          fetchCategories(),
        ]);

        setServerOptions(servers);
        setCategoryOptions(categories);
      } catch (error) {
        console.error("Failed to load filter options:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOptions();
  }, []);

  useEffect(() => {
    setLocalFilters({
      dateStart: filters.dateStart,
      dateEnd: filters.dateEnd,
      categories: filters.categories,
      servers: filters.servers,
      statuses: filters.statuses,
    });
  }, [filters]);

  const handleInputChange = (field: keyof typeof localFilters, value: any) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleMultiSelectChange = (
    field: "categories" | "servers" | "statuses",
    selectedValues: string[]
  ) => {
    handleInputChange(field, selectedValues);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
  };

  const handleReset = () => {
    const resetValues = {
      dateStart: "",
      dateEnd: "",
      categories: [],
      servers: [],
      statuses: [],
    };
    setLocalFilters(resetValues);
    onReset();
  };

  const getMultiSelectDisplayText = (
    selectedIds: string[],
    options: FilterOption[]
  ) => {
    if (selectedIds.length === 0) return "All";
    if (selectedIds.length === 1) {
      const option = options.find((opt) => opt.id === selectedIds[0]);
      return option?.name || "Unknown";
    }
    return `${selectedIds.length} selected`;
  };

  const CheckboxList: React.FC<{
    options: FilterOption[];
    selectedValues: string[];
    onChange: (values: string[]) => void;
    label: string;
  }> = ({ options, selectedValues, onChange, label }) => {
    const handleCheckboxChange = (optionId: string, checked: boolean) => {
      if (checked) {
        onChange([...selectedValues, optionId]);
      } else {
        onChange(selectedValues.filter((id) => id !== optionId));
      }
    };

    const handleSelectAll = () => {
      if (selectedValues.length === options.length) {
        onChange([]);
      } else {
        onChange(options.map((opt) => opt.id));
      }
    };

    return (
      <div className="checkbox-list">
        <div className="checkbox-header">
          <label className="checkbox-item">
            <input
              type="checkbox"
              checked={
                selectedValues.length === options.length && options.length > 0
              }
              onChange={handleSelectAll}
              className="checkbox-input"
            />
            <span className="checkbox-label-text">
              Select All ({selectedValues.length}/{options.length})
            </span>
          </label>
        </div>
        <div className="checkbox-options">
          {options.map((option) => (
            <label key={option.id} className="checkbox-item">
              <input
                type="checkbox"
                checked={selectedValues.includes(option.id)}
                onChange={(e) =>
                  handleCheckboxChange(option.id, e.target.checked)
                }
                className="checkbox-input"
              />
              <span className="checkbox-label-text">{option.name}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="history-filters">
        <div className="loading">
          <div className="loading-spinner"></div>
          Loading filters...
        </div>
      </div>
    );
  }

  return (
    <div className="history-filters">
      <div className="filters-grid">
        <div className="filter-group">
          <label className="filter-label">Date Range</label>
          <div className="history-date-range-group">
            <input
              type="date"
              className="filter-input"
              value={localFilters.dateStart}
              onChange={(e) => handleInputChange("dateStart", e.target.value)}
              placeholder="Start Date"
            />
            <input
              type="date"
              className="filter-input"
              value={localFilters.dateEnd}
              onChange={(e) => handleInputChange("dateEnd", e.target.value)}
              placeholder="End Date"
              min={localFilters.dateStart || undefined}
            />
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">
            Categories (
            {getMultiSelectDisplayText(
              localFilters.categories,
              categoryOptions
            )}
            )
          </label>
          <CheckboxList
            options={categoryOptions}
            selectedValues={localFilters.categories}
            onChange={(values) => handleMultiSelectChange("categories", values)}
            label="Categories"
          />
        </div>

        <div className="filter-group">
          <label className="filter-label">
            Servers (
            {getMultiSelectDisplayText(localFilters.servers, serverOptions)})
          </label>
          <CheckboxList
            options={serverOptions}
            selectedValues={localFilters.servers}
            onChange={(values) => handleMultiSelectChange("servers", values)}
            label="Servers"
          />
        </div>

        <div className="filter-group">
          <label className="filter-label">
            Status (
            {getMultiSelectDisplayText(localFilters.statuses, statusOptions)})
          </label>
          <CheckboxList
            options={statusOptions}
            selectedValues={localFilters.statuses}
            onChange={(values) => handleMultiSelectChange("statuses", values)}
            label="Status"
          />
        </div>
      </div>

      <div className="filter-actions">
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset Filters
        </button>
        <button className="btn btn-primary" onClick={handleApplyFilters}>
          Apply Filters
        </button>
      </div>

      {(localFilters.dateStart ||
        localFilters.dateEnd ||
        localFilters.categories.length > 0 ||
        localFilters.servers.length > 0 ||
        localFilters.statuses.length > 0) && (
        <div className="active-filters">
          <h4 className="active-filters-title">Active Filters:</h4>
          <div className="active-filters-list">
            {localFilters.dateStart && (
              <span className="filter-tag">
                From: {localFilters.dateStart}
                <button
                  className="filter-tag-remove"
                  onClick={() => handleInputChange("dateStart", "")}
                >
                  ×
                </button>
              </span>
            )}
            {localFilters.dateEnd && (
              <span className="filter-tag">
                To: {localFilters.dateEnd}
                <button
                  className="filter-tag-remove"
                  onClick={() => handleInputChange("dateEnd", "")}
                >
                  ×
                </button>
              </span>
            )}
            {localFilters.categories.map((catId) => {
              const category = categoryOptions.find((cat) => cat.id === catId);
              return category ? (
                <span key={catId} className="filter-tag">
                  {category.name}
                  <button
                    className="filter-tag-remove"
                    onClick={() =>
                      handleMultiSelectChange(
                        "categories",
                        localFilters.categories.filter((id) => id !== catId)
                      )
                    }
                  >
                    ×
                  </button>
                </span>
              ) : null;
            })}
            {localFilters.servers.map((serverId) => {
              const server = serverOptions.find((srv) => srv.id === serverId);
              return server ? (
                <span key={serverId} className="filter-tag">
                  {server.name}
                  <button
                    className="filter-tag-remove"
                    onClick={() =>
                      handleMultiSelectChange(
                        "servers",
                        localFilters.servers.filter((id) => id !== serverId)
                      )
                    }
                  >
                    ×
                  </button>
                </span>
              ) : null;
            })}
            {localFilters.statuses.map((statusId) => {
              const status = statusOptions.find((st) => st.id === statusId);
              return status ? (
                <span key={statusId} className="filter-tag">
                  {status.name}
                  <button
                    className="filter-tag-remove"
                    onClick={() =>
                      handleMultiSelectChange(
                        "statuses",
                        localFilters.statuses.filter((id) => id !== statusId)
                      )
                    }
                  >
                    ×
                  </button>
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryFilter;
