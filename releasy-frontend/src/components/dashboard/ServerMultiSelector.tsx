import React, { useState, useRef, useEffect } from "react";
import { Check, Monitor } from "lucide-react";
import { Server } from "../../services/types/dashboard";
import "../../styles/components/server-selector.css";
export {};

interface ServerMultiSelectorProps {
  servers: Server[];
  selectedServers: string[];
  onChange: (selectedServers: string[]) => void;
}

export const ServerMultiSelector: React.FC<ServerMultiSelectorProps> = ({
  servers,
  selectedServers,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleServer = (serverId: string) => {
    if (selectedServers.includes(serverId)) {
      onChange(selectedServers.filter((id) => id !== serverId));
    } else {
      onChange([...selectedServers, serverId]);
    }
  };

  const getStatusClass = (status: Server["status"]) => {
    switch (status) {
      case "online":
        return "server-status-online";
      case "offline":
        return "server-status-offline";
      case "maintenance":
        return "server-status-maintenance";
      default:
        return "";
    }
  };

  const selectedCount = selectedServers.length;
  const displayText =
    selectedCount === 0
      ? "Select servers"
      : selectedCount === servers.length
      ? "All servers"
      : `${selectedCount} servers`;

  return (
    <div className="server-selector" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="server-selector-button"
      >
        <Monitor className="server-selector-icon" />
        <span>{displayText}</span>
      </button>

      {isOpen && (
        <div className="server-selector-dropdown">
          <div className="server-selector-actions">
            <div className="server-selector-actions-row">
              <button
                onClick={() => onChange(servers.map((s) => s.id))}
                className="server-selector-action-button select-all"
              >
                Select All
              </button>
              <button
                onClick={() => onChange([])}
                className="server-selector-action-button clear-all"
              >
                Clear All
              </button>
            </div>
          </div>
          <div className="server-selector-options">
            {servers.map((server) => {
              const isSelected = selectedServers.includes(server.id);
              return (
                <button
                  key={server.id}
                  onClick={() => toggleServer(server.id)}
                  className="server-option"
                >
                  <div className="server-option-checkbox">
                    {isSelected && (
                      <Check className="server-option-checkbox-icon" />
                    )}
                  </div>
                  <Monitor
                    className={`server-option-icon ${getStatusClass(
                      server.status
                    )}`}
                  />
                  <span className="server-option-name">{server.name}</span>
                  <span
                    className={`server-option-status ${getStatusClass(
                      server.status
                    )}`}
                  >
                    {server.status}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
