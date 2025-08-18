import React from "react";
import {
  PlayIcon,
  StopIcon,
  PencilIcon,
  PlusIcon,
  EyeIcon,
  NotePencilIcon,
  GearIcon,
  MagnifyingGlassIcon,
  CrownIcon,
} from "@phosphor-icons/react";
import {
  PermissionRole,
  PipelineRequestAction,
} from "../../services/types/request";

interface IconComponentProps {
  action?: PipelineRequestAction;
  role?: PermissionRole;
  size?: number;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  className?: string;
}

export const IconComponent: React.FC<IconComponentProps> = ({
  action,
  role,
  size = 24,
  weight = "regular",
  className = "",
}) => {
  // Pipeline Action Icons
  const getActionIcon = (actionType: PipelineRequestAction) => {
    const iconProps = { size, weight, className };

    switch (actionType) {
      case "create":
        return <PlusIcon {...iconProps} />;
      case "modify":
        return <PencilIcon {...iconProps} />;
      case "execute":
        return <PlayIcon {...iconProps} />;
      case "stop":
        return <StopIcon {...iconProps} />;
      default:
        return null;
    }
  };

  // Permission Role Icons
  const getRoleIcon = (roleType: PermissionRole) => {
    const iconProps = { size, weight, className };

    switch (roleType) {
      case "viewer":
        return <EyeIcon {...iconProps} />;
      case "editor":
        return <NotePencilIcon {...iconProps} />;
      case "operator":
        return <GearIcon {...iconProps} />;
      case "auditor":
        return <MagnifyingGlassIcon {...iconProps} />;
      case "admin":
        return <CrownIcon {...iconProps} />;
      default:
        return null;
    }
  };

  if (action) {
    return getActionIcon(action);
  }

  if (role) {
    return getRoleIcon(role);
  }

  return null;
};
