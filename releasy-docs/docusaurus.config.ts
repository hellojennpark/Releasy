import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Releasy",
  tagline:
    "Unified Release Management Platform: streamline your CI/CD operations across multiple tools",
  favicon: "img/heart_on_fire_flat.svg",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://releasy.vercel.app",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
  themeConfig: {
    // Replace with your project's social card
    image: "img/simplikins_social_card.png",
    navbar: {
      title: "Releasy",
      logo: {
        alt: "Releasy Logo",
        src: "img/heart_on_fire_animated.png",
      },
      items: [
        // {
        //   type: "docSidebar",
        //   sidebarId: "tutorialSidebar",
        //   position: "left",
        //   label: "Getting Started",
        // },
        {
          type: "docSidebar",
          sidebarId: "apiSidebar",
          position: "left",
          label: "API Documentation",
        },
        {
          type: "docSidebar",
          sidebarId: "featureSidebar",
          position: "left",
          label: "Features",
        },
        {
          type: "docSidebar",
          sidebarId: "architectureSidebar",
          position: "left",
          label: "Architecture",
        },
        // {
        //   href: "https://github.com/facebook/docusaurus",
        //   label: "Demo",
        //   position: "right",
        // },
        {
          href: "https://github.com/hellojennpark/Releasy",
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://www.hellojennpark.com/blog",
          label: "Blog",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            // {
            //   label: "Getting Started",
            //   to: "/docs/getting-started/intro",
            // },
            {
              label: "API Documentation",
              to: "/docs/api/rest-api-design",
            },
            {
              label: "Features",
              to: "/docs/features/intro",
            },
            {
              label: "Architecture",
              to: "/docs/architecture/database-schema",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              href: "https://www.hellojennpark.com/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/hellojennpark/Releasy",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Releasy, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
