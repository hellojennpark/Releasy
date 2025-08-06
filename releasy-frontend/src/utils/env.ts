type Env = "dev" | "staging" | "prod";

interface EnvMeta {
  label: string;
  className: string;
}

const ENV_MAP: Record<Env, EnvMeta> = {
  dev: { label: "Dev", className: "env-success" },
  staging: { label: "Staging", className: "env-warning" },
  prod: { label: "Prod", className: "env-error" },
};

export function getEnvironmentMeta(): EnvMeta {
  const raw = process.env.REACT_APP_ENV?.toLowerCase() ?? "dev";

  if (raw === "prod" || raw === "staging" || raw === "dev") {
    return ENV_MAP[raw];
  }

  return {
    label: raw,
    className: "env-default",
  };
}
