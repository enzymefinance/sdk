import { defineConfig } from "vocs";

export default defineConfig({
  title: "Enzyme Finance",
  rootDir: ".",
  sidebar: [
    {
      text: "Overview",
      link: "/overview",
    },
    {
      text: "API",
      collapsed: false,
      items: [
        {
          text: "Overview",
          link: "/api/overview",
        },
        {
          text: "Vault",
          link: "/api/vault",
        },
        {
          text: "Depositor",
          link: "/api/depositor",
        },
        {
          text: "Manager",
          link: "/api/manager",
        },
        {
          text: "Network",
          link: "/api/network",
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
        {
          text: "Depositor Actions",
          items: [
            {
              text: "Deposit",
              link: "/sdk/depositor/deposit",
            },
            {
              text: "Withdraw",
              link: "/sdk/depositor/withdraw",
            },
          ],
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
