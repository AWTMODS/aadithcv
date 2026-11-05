export interface DonationConfig {
  upiId: string;
  recipientName: string;
  defaultNote: string;
  buyMeACoffeeUrl: string;
  suggestedAmounts: number[];
  coffeeTiers: {
    count: number;
    amount: number;
    label: string;
    emoji: string;
    desc: string;
  }[];
}

export const donationConfig: DonationConfig = {
  upiId: "aadithaadith14-2@okicici",
  recipientName: "Aadith C V",
  defaultNote: "Support Aadith C V - Developer",
  buyMeACoffeeUrl: "https://buymeacoffee.com/aadithcvin9",
  suggestedAmounts: [50, 100, 200, 500, 1000],
  coffeeTiers: [
    {
      count: 1,
      amount: 100,
      label: "1 Coffee",
      emoji: "☕",
      desc: "Fuel an evening of coding & open-source work",
    },
    {
      count: 3,
      amount: 300,
      label: "3 Coffees",
      emoji: "☕☕☕",
      desc: "Help support hosting, APIs & app distribution",
    },
    {
      count: 5,
      amount: 500,
      label: "5 Coffees",
      emoji: "☕☕☕☕☕",
      desc: "Power new application features & community bots",
    },
  ],
};

