import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Png?: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Multi-Platform CI/CD Management",
    Png: "img/handshake_3d.png",
    description: (
      <>
        Manage Jenkins, Airflow, GitHub Actions, and other CI/CD tools from a
        single unified interface. Monitor pipelines and workflows across your
        entire release infrastructure without tool switching.
      </>
    ),
  },
  {
    title: "Streamlined Permission & Approval Workflows",
    Png: "img/locked_with_pen_3d.png",
    description: (
      <>
        Built-in permission management and approval processes across platforms.
        Replace ad-hoc permission requests with structured, auditable workflows
        that maintain complete access history and compliance.
      </>
    ),
  },
  {
    title: "Developer-First Experience",
    Png: "img/bullseye_3d.png",
    description: (
      <>
        Intuitive interface that abstracts away platform complexity. Developers
        focus on releases, not tool-specific configurations. Operators get
        centralized control and visibility.
      </>
    ),
  },
];

function Feature({ title, Png, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        {Png && (
          <img src={Png} className={styles.featurePng} role="img" alt={title} />
        )}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
