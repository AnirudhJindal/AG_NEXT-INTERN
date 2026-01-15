import type { CardNavItem } from "../components/CardNav";

export const items: CardNavItem[] = [
  {
    label: "About",
    bgColor: "#0D0716",
    textColor: "#fff",
    links: [
      {
        label: "Dev",
        ariaLabel: "AboutDeveloper",
        href: "/aboutDev"
      },
    ]
  },
  {
    label: "Projects",
    bgColor: "#170D27",
    textColor: "#fff",
    links: [
      {
        label: "Github",
        ariaLabel: "github",
        href: "https://github.com/AnirudhJindal"
      },
    ]
  }
];
