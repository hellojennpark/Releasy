// hooks/useHistoryFilters.ts
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PipelineHistoryFilters } from "../services/types/pipeline";

export const useHistoryFilters = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [filters, setFilters] = useState<PipelineHistoryFilters>({
    dateStart: "",
    dateEnd: "",
    categories: [],
    servers: [],
    statuses: [],
    page: 1,
    limit: 20,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const urlFilters: PipelineHistoryFilters = {
      dateStart: searchParams.get("dateStart") || "",
      dateEnd: searchParams.get("dateEnd") || "",
      categories:
        searchParams.get("categories")?.split(",").filter(Boolean) || [],
      servers: searchParams.get("servers")?.split(",").filter(Boolean) || [],
      statuses: searchParams.get("statuses")?.split(",").filter(Boolean) || [],
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "20"),
    };

    setFilters(urlFilters);
  }, [location.search]);

  const updateURL = useCallback(
    (newFilters: PipelineHistoryFilters) => {
      const params = new URLSearchParams();

      if (newFilters.dateStart) params.set("dateStart", newFilters.dateStart);
      if (newFilters.dateEnd) params.set("dateEnd", newFilters.dateEnd);
      if (newFilters.categories.length > 0)
        params.set("categories", newFilters.categories.join(","));
      if (newFilters.servers.length > 0)
        params.set("servers", newFilters.servers.join(","));
      if (newFilters.statuses.length > 0)
        params.set("statuses", newFilters.statuses.join(","));
      if (newFilters.page > 1) params.set("page", newFilters.page.toString());
      if (newFilters.limit !== 20)
        params.set("limit", newFilters.limit.toString());

      const queryString = params.toString();
      const url = queryString ? `?${queryString}` : "";

      navigate(`${location.pathname}${url}`, { replace: true });
    },
    [navigate, location.pathname]
  );

  const updateFilters = useCallback(
    (newFilters: Partial<PipelineHistoryFilters>) => {
      const updatedFilters = { ...filters, ...newFilters };

      if (!("page" in newFilters)) {
        updatedFilters.page = 1;
      }

      setFilters(updatedFilters);
      updateURL(updatedFilters);
    },
    [filters, updateURL]
  );

  const resetFilters = useCallback(() => {
    const resetFilters: PipelineHistoryFilters = {
      dateStart: "",
      dateEnd: "",
      categories: [],
      servers: [],
      statuses: [],
      page: 1,
      limit: 20,
    };

    setFilters(resetFilters);
    updateURL(resetFilters);
  }, [updateURL]);

  const setPage = useCallback(
    (page: number) => {
      updateFilters({ page });
    },
    [updateFilters]
  );

  return {
    filters,
    updateFilters,
    resetFilters,
    setPage,
  };
};
