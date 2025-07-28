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
    title: "Unified Multi-Server Management",
    Png: "img/handshake_3d.png",
    description: (
      <>
        Manage multiple Jenkins servers from a single interface. Monitor and
        execute jobs across your entire CI/CD infrastructure without context
        switching.
      </>
    ),
  },
  {
    title: "Integrated Permission Workflow",
    Png: "img/locked_with_pen_3d.png",
    description: (
      <>
        Built-in permission request and approval process. Replace permission
        requests with structured, auditable workflows that maintain complete
        access history.
      </>
    ),
  },
  {
    title: "User-Centric Experience",
    Png: "img/bullseye_3d.png",
    description: (
      <>
        Simplified interface for developers and operators. Hide complexity while
        exposing essential features to reduce learning curve and boost
        productivity.
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
