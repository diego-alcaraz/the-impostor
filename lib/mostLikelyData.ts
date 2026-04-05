export interface PromptCategory {
  name: string;
  emoji: string;
  prompts: string[];
}

export const promptCategories: PromptCategory[] = [
  {
    name: "Survival & Adventure",
    emoji: "🏔️",
    prompts: [
      "Most likely to survive a zombie apocalypse",
      "Most likely to survive on a deserted island",
      "Most likely to climb Mount Everest",
      "Most likely to go skydiving on a whim",
      "Most likely to befriend a wild animal",
      "Most likely to get lost in a foreign country",
      "Most likely to survive the longest in a horror movie",
      "Most likely to explore a haunted house alone",
      "Most likely to travel to every continent",
      "Most likely to live off the grid for a year",
    ],
  },
  {
    name: "Fame & Fortune",
    emoji: "⭐",
    prompts: [
      "Most likely to become famous",
      "Most likely to become a millionaire",
      "Most likely to win the lottery and lose the ticket",
      "Most likely to become a reality TV star",
      "Most likely to accidentally become a meme",
      "Most likely to go viral on social media",
      "Most likely to befriend a celebrity",
      "Most likely to write a best-selling book",
      "Most likely to win an Oscar",
      "Most likely to start a successful business",
    ],
  },
  {
    name: "Oops & Fails",
    emoji: "😅",
    prompts: [
      "Most likely to trip on a flat surface",
      "Most likely to send a text to the wrong person",
      "Most likely to forget where they parked",
      "Most likely to lock themselves out of the house",
      "Most likely to burn water while cooking",
      "Most likely to sleep through an important alarm",
      "Most likely to walk into a glass door",
      "Most likely to accidentally start a fire",
      "Most likely to laugh at the worst possible moment",
      "Most likely to show up to the wrong event",
    ],
  },
  {
    name: "Talents & Skills",
    emoji: "🎯",
    prompts: [
      "Most likely to win a cooking competition",
      "Most likely to win a dance battle",
      "Most likely to learn a new language fluently",
      "Most likely to invent something useful",
      "Most likely to win a staring contest",
      "Most likely to win an argument with anyone",
      "Most likely to talk their way out of a speeding ticket",
      "Most likely to beat everyone at a board game",
      "Most likely to give the best advice",
      "Most likely to become a professional athlete",
    ],
  },
  {
    name: "Quirks & Habits",
    emoji: "🤪",
    prompts: [
      "Most likely to still be playing video games at 80",
      "Most likely to adopt 10 pets",
      "Most likely to binge an entire TV series in one day",
      "Most likely to sing in the shower the loudest",
      "Most likely to hoard the most useless things",
      "Most likely to cry over a cute animal video",
      "Most likely to talk to plants",
      "Most likely to eat cereal for every meal",
      "Most likely to fall asleep anywhere",
      "Most likely to show up overdressed to a casual event",
    ],
  },
  {
    name: "Bold Moves",
    emoji: "🔥",
    prompts: [
      "Most likely to get a tattoo on impulse",
      "Most likely to dye their hair a wild color",
      "Most likely to move to a different country tomorrow",
      "Most likely to start a revolution",
      "Most likely to run a marathon without training",
      "Most likely to be late to their own wedding",
      "Most likely to quit their job to follow a dream",
      "Most likely to ask a stranger on a date",
      "Most likely to eat the spiciest food without flinching",
      "Most likely to do karaoke sober in front of strangers",
    ],
  },
];

export const allPrompts: string[] = promptCategories.flatMap((c) => c.prompts);

export function getShuffledPrompts(count: number): string[] {
  const shuffled = [...allPrompts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
