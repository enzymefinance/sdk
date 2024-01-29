import { defineConfig } from "vocs";

export default defineConfig({
  title: "Enzyme API/SDK",
  rootDir: "src",
  sidebar: [
    {
      text: "Overview",
      link: "/",
    },
    {
      text: "Getting Started",
      link: "/getting-started",
    },
    {
      text: "API",
      collapsed: false,
      items: [
        {
          text: "Overview",
          link: "/api/overview",
        },
      ],
    },
    {
      text: "SDK",
      collapsed: false,
      items: [
        {
          text: "Overview",
          link: "/sdk/overview",
        },
      ],
    },
  ],
  socials: [
    {
      icon: "discord",
      link: "https://discord.enzyme.finance",
    },
    {
      icon: "github",
      link: "https://github.com/enzymefinance/sdk",
    },
    {
      icon: "x",
      link: "https://twitter.com/enzymefinance",
    },
  ],
});
