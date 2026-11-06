export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  handle: string;
  icon: string;
}

export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    label: "Explore repositories",
    url: "https://github.com/#",
    handle: "github.com/aadithcv",
    icon: "Github",
  },
  {
    platform: "LinkedIn",
    label: "Connect professionally",
    url: "https://linkedin.com/in/#",
    handle: "linkedin.com/in/aadithcv",
    icon: "Linkedin",
  },
  {
    platform: "Telegram",
    label: "Direct message",
    url: "https://t.me/#",
    handle: "@aadithcv",
    icon: "Send",
  },
  {
    platform: "Instagram",
    label: "Creative updates",
    url: "https://instagram.com/#",
    handle: "@aadithcv",
    icon: "Instagram",
  },
  {
    platform: "Email",
    label: "Start a conversation",
    url: "mailto:aadithaadith14@gmail.com",
    handle: "aadithaadith14@gmail.com",
    icon: "Mail",
  },
  {
    platform: "Buy Me a Coffee",
    label: "Support my work",
    url: "https://buymeacoffee.com/aadithcvin9",
    handle: "buymeacoffee.com/aadithcvin9",
    icon: "Coffee",
  },
];
