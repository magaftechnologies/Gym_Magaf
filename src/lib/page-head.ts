export function pageHead(title: string, description: string) {
  description = `Fictional fitness website demo by MAGAF Technologies. ${description}`;
  const fullTitle = `MEGA GYM | ${title} — Interactive Website Demo`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
