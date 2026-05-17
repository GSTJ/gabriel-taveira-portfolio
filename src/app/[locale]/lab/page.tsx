"use client";

/* =============================================================================
   /lab · Palette × Font mix-and-match playground
   Pick a palette and a hero font from the sticky bar; the preview re-renders
   with the chosen combo. Selection persists across reloads via localStorage.
   ============================================================================= */

import { useEffect, useMemo, useState } from "react";

/* ---------- Palettes ---------- */

type Scale = {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

type Palette = {
  id: string;
  label: string;
  blurb: string;
  scale: Scale;
  /** [light, mid, darker] stops for the hero `em` linear-gradient */
  emGradient: [string, string, string];
  /** "r, g, b" — used in rgba() overrides for shadow/chip/glow */
  shadowRgb: string;
};

/* Scales tuned to match the perceptual lightness curve of Ember (100 -> 900
   stays in the same brightness band, with a faint hue retained at the ends).
   Hand-picked per palette — no flat HSL ramps. */
const PALETTES: Palette[] = [
  // ---- Existing six (kept verbatim) ----
  {
    id: "ember",
    label: "Ember",
    blurb: "Warm LED amber · current",
    scale: { 100: "#fde9d6", 200: "#fbd5ad", 300: "#f8b878", 400: "#f29842", 500: "#e07a1f", 600: "#b85d12", 700: "#8a440d", 800: "#5a2c08", 900: "#3a1d05" },
    emGradient: ["#f29842", "#e07a1f", "#e63b30"],
    shadowRgb: "224, 122, 31",
  },
  {
    id: "pine",
    label: "Pine",
    blurb: "Cool pine-forest green",
    scale: { 100: "#dcefe2", 200: "#b1dac0", 300: "#7ec199", 400: "#3f9a68", 500: "#0f6b3a", 600: "#0c5a31", 700: "#0a4828", 800: "#06321b", 900: "#031f10" },
    emGradient: ["#3f9a68", "#0f6b3a", "#05311b"],
    shadowRgb: "15, 107, 58",
  },
  {
    id: "olive",
    label: "Olive",
    blurb: "Warm khaki / military earth",
    scale: { 100: "#f1eecf", 200: "#dfdba0", 300: "#c5c067", 400: "#9aa336", 500: "#7a8b1f", 600: "#646f1a", 700: "#4e5614", 800: "#363b0d", 900: "#1f2206" },
    emGradient: ["#9aa336", "#7a8b1f", "#3e4510"],
    shadowRgb: "122, 139, 31",
  },
  {
    id: "crimson",
    label: "Crimson",
    blurb: "Deep wine / oxblood",
    scale: { 100: "#fbdedb", 200: "#f3b1aa", 300: "#e57f74", 400: "#cd4138", 500: "#a8201a", 600: "#8a1814", 700: "#6b110f", 800: "#4a0a08", 900: "#2b0504" },
    emGradient: ["#cd4138", "#a8201a", "#5d0d0a"],
    shadowRgb: "168, 32, 26",
  },
  {
    id: "ultramarine",
    label: "Ultramarine",
    blurb: "Saturated cobalt blue",
    scale: { 100: "#dde6f8", 200: "#b3c7ef", 300: "#82a3e2", 400: "#4a7bd1", 500: "#2a5fbf", 600: "#1f4ea0", 700: "#173d7e", 800: "#0f2a58", 900: "#071833" },
    emGradient: ["#4a7bd1", "#2a5fbf", "#142c66"],
    shadowRgb: "42, 95, 191",
  },
  {
    id: "plum",
    label: "Plum",
    blurb: "Muted aubergine · moody",
    scale: { 100: "#efdcec", 200: "#d6afd0", 300: "#b87fb0", 400: "#90478a", 500: "#7a3470", 600: "#62295a", 700: "#4a2045", 800: "#33162f", 900: "#1c0c1a" },
    emGradient: ["#90478a", "#7a3470", "#3c1a37"],
    shadowRgb: "122, 52, 112",
  },

  // ---- Neutrals ----
  {
    id: "gray",
    label: "Gray",
    blurb: "Neutral charcoal · grayscale",
    scale: { 100: "#ececec", 200: "#d4d4d4", 300: "#b4b4b4", 400: "#9a9a9a", 500: "#8a8a8a", 600: "#6e6e6e", 700: "#535353", 800: "#363636", 900: "#1d1d1d" },
    emGradient: ["#b4b4b4", "#8a8a8a", "#2a2a2a"],
    shadowRgb: "138, 138, 138",
  },
  {
    id: "stone",
    label: "Stone",
    blurb: "Warm gray · sun-bleached",
    scale: { 100: "#ece8e3", 200: "#d6cec3", 300: "#b8ad9d", 400: "#988c7d", 500: "#7a7269", 600: "#615a52", 700: "#48433d", 800: "#2f2c28", 900: "#1a1815" },
    emGradient: ["#b8ad9d", "#7a7269", "#2a2722"],
    shadowRgb: "122, 114, 105",
  },
  {
    id: "slate",
    label: "Slate",
    blurb: "Cool gray with blue undertone",
    scale: { 100: "#e6eaef", 200: "#cbd3dd", 300: "#a4b0c0", 400: "#7d8b9f", 500: "#64748b", 600: "#4f5d72", 700: "#3b4656", 800: "#262e3a", 900: "#141921" },
    emGradient: ["#a4b0c0", "#64748b", "#1f262f"],
    shadowRgb: "100, 116, 139",
  },
  {
    id: "black",
    label: "Black",
    blurb: "Near-black · minimal",
    scale: { 100: "#dedede", 200: "#bcbcbc", 300: "#8e8e8e", 400: "#5a5a5a", 500: "#1f1f1f", 600: "#181818", 700: "#121212", 800: "#0a0a0a", 900: "#020202" },
    emGradient: ["#5a5a5a", "#1f1f1f", "#000000"],
    shadowRgb: "31, 31, 31",
  },
  {
    id: "cream",
    label: "Cream",
    blurb: "Warm off-white · paper",
    scale: { 100: "#faf6ec", 200: "#f3ecda", 300: "#ebe1c5", 400: "#e4dcc6", 500: "#d4c8a8", 600: "#aea284", 700: "#857a5f", 800: "#5a523e", 900: "#332e22" },
    emGradient: ["#ebe1c5", "#d4c8a8", "#5a523e"],
    shadowRgb: "212, 200, 168",
  },
  {
    id: "bone",
    label: "Bone",
    blurb: "Chalky white",
    scale: { 100: "#faf7ee", 200: "#f4eedd", 300: "#ede5c8", 400: "#ece4d3", 500: "#d0c5a8", 600: "#a89e84", 700: "#7d745f", 800: "#524c3e", 900: "#2d2922" },
    emGradient: ["#ede5c8", "#ece4d3", "#52443e"],
    shadowRgb: "208, 197, 168",
  },

  // ---- Reds / pinks ----
  {
    id: "brick",
    label: "Brick",
    blurb: "Terracotta red-orange",
    scale: { 100: "#f8e0d6", 200: "#eebca8", 300: "#df8c70", 400: "#c66344", 500: "#b04a2c", 600: "#8f3b22", 700: "#6c2c19", 800: "#481c10", 900: "#280f08" },
    emGradient: ["#df8c70", "#b04a2c", "#48180e"],
    shadowRgb: "176, 74, 44",
  },
  {
    id: "rust",
    label: "Rust",
    blurb: "Oxidized iron · weathered",
    scale: { 100: "#f4dccc", 200: "#e6b598", 300: "#d18762", 400: "#b56335", 500: "#9b4a1f", 600: "#7e3b18", 700: "#5e2c12", 800: "#3e1c0b", 900: "#240f06" },
    emGradient: ["#d18762", "#9b4a1f", "#3a180a"],
    shadowRgb: "155, 74, 31",
  },
  {
    id: "burgundy",
    label: "Burgundy",
    blurb: "Deep wine · cellar dark",
    scale: { 100: "#f1d8db", 200: "#dfa6ac", 300: "#c4727a", 400: "#9a3b48", 500: "#6e1827", 600: "#591421", 700: "#43101a", 800: "#2c0a11", 900: "#170509" },
    emGradient: ["#c4727a", "#6e1827", "#2a0810"],
    shadowRgb: "110, 24, 39",
  },
  {
    id: "oxblood",
    label: "Oxblood",
    blurb: "Dark blood red",
    scale: { 100: "#efd7d4", 200: "#dba6a1", 300: "#c0746e", 400: "#963f3a", 500: "#6a1e1e", 600: "#561818", 700: "#411212", 800: "#2a0c0c", 900: "#160606" },
    emGradient: ["#c0746e", "#6a1e1e", "#2a0a0a"],
    shadowRgb: "106, 30, 30",
  },
  {
    id: "cherry",
    label: "Cherry",
    blurb: "Bright primary red",
    scale: { 100: "#fcdadc", 200: "#f7a8ad", 300: "#ef7079", 400: "#e34550", 500: "#dc2837", 600: "#b41e2c", 700: "#871620", 800: "#5a0e15", 900: "#33060a" },
    emGradient: ["#ef7079", "#dc2837", "#5d0d14"],
    shadowRgb: "220, 40, 55",
  },
  {
    id: "coral-deep",
    label: "Coral Deep",
    blurb: "Saturated coral red",
    scale: { 100: "#fadddd", 200: "#f3afae", 300: "#e87f7e", 400: "#d85957", 500: "#cc4040", 600: "#a73334", 700: "#7e2628", 800: "#54181a", 900: "#2e0c0d" },
    emGradient: ["#e87f7e", "#cc4040", "#54181a"],
    shadowRgb: "204, 64, 64",
  },
  {
    id: "salmon",
    label: "Salmon",
    blurb: "Soft pink-orange",
    scale: { 100: "#fbe8e0", 200: "#f5c8b6", 300: "#efaf99", 400: "#eca890", 500: "#e89b85", 600: "#bc7565", 700: "#8c554b", 800: "#5d3832", 900: "#33201d" },
    emGradient: ["#efaf99", "#e89b85", "#5d3832"],
    shadowRgb: "232, 155, 133",
  },
  {
    id: "blush",
    label: "Blush",
    blurb: "Warm peachy pink",
    scale: { 100: "#fae4dd", 200: "#f4c2b3", 300: "#ecaa97", 400: "#e6a89a", 500: "#e3a99a", 600: "#b58075", 700: "#875e55", 800: "#593d37", 900: "#30201d" },
    emGradient: ["#ecaa97", "#e3a99a", "#593d37"],
    shadowRgb: "227, 169, 154",
  },
  {
    id: "rose",
    label: "Rose",
    blurb: "Vintage rose pink",
    scale: { 100: "#f9dde4", 200: "#f0aebd", 300: "#e57e96", 400: "#dd6b85", 500: "#d97a8e", 600: "#b05f73", 700: "#824657", 800: "#562d3a", 900: "#2f1820" },
    emGradient: ["#e57e96", "#d97a8e", "#3a1d27"],
    shadowRgb: "217, 122, 142",
  },
  {
    id: "magenta",
    label: "Magenta",
    blurb: "Electric pink-violet",
    scale: { 100: "#f6d6e6", 200: "#eaa3c8", 300: "#dc70a7", 400: "#cd4d94", 500: "#c33d8a", 600: "#9d3070", 700: "#762354", 800: "#4d1636", 900: "#2a0b1d" },
    emGradient: ["#dc70a7", "#c33d8a", "#4d1636"],
    shadowRgb: "195, 61, 138",
  },
  {
    id: "fuchsia",
    label: "Fuchsia",
    blurb: "Deep saturated pink",
    scale: { 100: "#f4d2e0", 200: "#e7a0bf", 300: "#d76f9c", 400: "#c84479", 500: "#bd2c6d", 600: "#992258", 700: "#721942", 800: "#4a102a", 900: "#280816" },
    emGradient: ["#d76f9c", "#bd2c6d", "#4a102a"],
    shadowRgb: "189, 44, 109",
  },
  {
    id: "mauve",
    label: "Mauve",
    blurb: "Dusty muted pink-purple",
    scale: { 100: "#efe1e6", 200: "#dbbcc7", 300: "#c397a8", 400: "#ad8898", 500: "#a37a8e", 600: "#836172", 700: "#624956", 800: "#412f39", 900: "#23191e" },
    emGradient: ["#c397a8", "#a37a8e", "#41303a"],
    shadowRgb: "163, 122, 142",
  },

  // ---- Oranges / yellows / browns ----
  {
    id: "persimmon",
    label: "Persimmon",
    blurb: "Bright orange-coral",
    scale: { 100: "#fbe1d4", 200: "#f5b89c", 300: "#ed8a64", 400: "#e6764a", 500: "#e2683b", 600: "#b85230", 700: "#893d23", 800: "#5b2817", 900: "#32150c" },
    emGradient: ["#ed8a64", "#e2683b", "#5b2817"],
    shadowRgb: "226, 104, 59",
  },
  {
    id: "apricot",
    label: "Apricot",
    blurb: "Soft warm orange",
    scale: { 100: "#faead8", 200: "#f3d0ad", 300: "#edb585", 400: "#eaab78", 500: "#e8a268", 600: "#bc7f53", 700: "#8c5e3e", 800: "#5d3e29", 900: "#332316" },
    emGradient: ["#edb585", "#e8a268", "#5d3e29"],
    shadowRgb: "232, 162, 104",
  },
  {
    id: "saffron",
    label: "Saffron",
    blurb: "Spice orange",
    scale: { 100: "#fbe5d0", 200: "#f6c69e", 300: "#f0a26b", 400: "#ec9542", 500: "#e89a2c", 600: "#bc7b23", 700: "#8c5c1a", 800: "#5d3d11", 900: "#332108" },
    emGradient: ["#f0a26b", "#e89a2c", "#5d3d11"],
    shadowRgb: "232, 154, 44",
  },
  {
    id: "honey",
    label: "Honey",
    blurb: "Golden amber",
    scale: { 100: "#fbe9cc", 200: "#f6ce96", 300: "#efb061", 400: "#eaae4b", 500: "#e6a93b", 600: "#ba872f", 700: "#8b6523", 800: "#5d4318", 900: "#33240d" },
    emGradient: ["#efb061", "#e6a93b", "#5d4318"],
    shadowRgb: "230, 169, 59",
  },
  {
    id: "mustard",
    label: "Mustard",
    blurb: "Aged yellow-brown",
    scale: { 100: "#f7eacc", 200: "#ecd095", 300: "#dfb35e", 400: "#d8a544", 500: "#d4a437", 600: "#aa832c", 700: "#806221", 800: "#554116", 900: "#2e240c" },
    emGradient: ["#dfb35e", "#d4a437", "#554116"],
    shadowRgb: "212, 164, 55",
  },
  {
    id: "ochre",
    label: "Ochre",
    blurb: "Warm earth yellow-brown",
    scale: { 100: "#f3e3c4", 200: "#e3c188", 300: "#cf9f4c", 400: "#c39137", 500: "#c08e2c", 600: "#9b7224", 700: "#73561b", 800: "#4d3912", 900: "#2a1f09" },
    emGradient: ["#cf9f4c", "#c08e2c", "#4d3912"],
    shadowRgb: "192, 142, 44",
  },
  {
    id: "mocha",
    label: "Mocha",
    blurb: "Roasted coffee brown",
    scale: { 100: "#ecdcd0", 200: "#d4b29c", 300: "#b78468", 400: "#956140", 500: "#7d4a2c", 600: "#653b23", 700: "#4c2c1a", 800: "#321d11", 900: "#1b0f08" },
    emGradient: ["#b78468", "#7d4a2c", "#311c10"],
    shadowRgb: "125, 74, 44",
  },
  {
    id: "walnut",
    label: "Walnut",
    blurb: "Deep wood brown",
    scale: { 100: "#e7d6c8", 200: "#cba892", 300: "#a87a5c", 400: "#7e5036", 500: "#5a3722", 600: "#492c1b", 700: "#372214", 800: "#24160d", 900: "#130b06" },
    emGradient: ["#a87a5c", "#5a3722", "#241208"],
    shadowRgb: "90, 55, 34",
  },
  {
    id: "espresso",
    label: "Espresso",
    blurb: "Near-black brown",
    scale: { 100: "#ddd0c5", 200: "#b89e8c", 300: "#8a6c5a", 400: "#583e2e", 500: "#3a2418", 600: "#2f1c12", 700: "#23150d", 800: "#170d08", 900: "#0a0603" },
    emGradient: ["#8a6c5a", "#3a2418", "#0a0603"],
    shadowRgb: "58, 36, 24",
  },
  {
    id: "tan",
    label: "Tan",
    blurb: "Warm beige · saddle",
    scale: { 100: "#f0e6d5", 200: "#dec8a7", 300: "#c4a87a", 400: "#b29670", 500: "#a88860", 600: "#866c4c", 700: "#645138", 800: "#433625", 900: "#251e14" },
    emGradient: ["#c4a87a", "#a88860", "#433625"],
    shadowRgb: "168, 136, 96",
  },
  {
    id: "sand",
    label: "Sand",
    blurb: "Light beige · dune",
    scale: { 100: "#f6eedc", 200: "#ecddb7", 300: "#dfc88e", 400: "#d3bd92", 500: "#c8b48a", 600: "#a18f6e", 700: "#796b52", 800: "#504737", 900: "#2c271e" },
    emGradient: ["#dfc88e", "#c8b48a", "#504737"],
    shadowRgb: "200, 180, 138",
  },
  {
    id: "khaki",
    label: "Khaki",
    blurb: "Drab military green-brown",
    scale: { 100: "#ebe5c8", 200: "#d3c896", 300: "#b6a865", 400: "#a3956b", 500: "#9a8d62", 600: "#7c7150", 700: "#5d553c", 800: "#3e3828", 900: "#221f16" },
    emGradient: ["#b6a865", "#9a8d62", "#3e3828"],
    shadowRgb: "154, 141, 98",
  },
  {
    id: "taupe",
    label: "Taupe",
    blurb: "Brown-gray neutral",
    scale: { 100: "#eae5df", 200: "#cfc6ba", 300: "#aea090", 400: "#97897a", 500: "#8a7e72", 600: "#6e645b", 700: "#524a44", 800: "#36312d", 900: "#1d1a18" },
    emGradient: ["#aea090", "#8a7e72", "#36312d"],
    shadowRgb: "138, 126, 114",
  },

  // ---- Greens ----
  {
    id: "mint",
    label: "Mint",
    blurb: "Cool green-blue · fresh",
    scale: { 100: "#dbf3eb", 200: "#aae0cc", 300: "#7accae", 400: "#74c8aa", 500: "#6cc4a6", 600: "#4f9f86", 700: "#3a7763", 800: "#264f42", 900: "#142b24" },
    emGradient: ["#7accae", "#6cc4a6", "#264f42"],
    shadowRgb: "108, 196, 166",
  },
  {
    id: "seafoam",
    label: "Seafoam",
    blurb: "Pale teal-green",
    scale: { 100: "#defaf0", 200: "#b0e8d4", 300: "#86d4b8", 400: "#82d0b5", 500: "#7ec9b1", 600: "#5fa28e", 700: "#477a6a", 800: "#2f5147", 900: "#192c26" },
    emGradient: ["#86d4b8", "#7ec9b1", "#2f5147"],
    shadowRgb: "126, 201, 177",
  },
  {
    id: "sage",
    label: "Sage",
    blurb: "Muted herb green",
    scale: { 100: "#e8edd9", 200: "#cbd6b1", 300: "#aabc8c", 400: "#a3b690", 500: "#9ab18c", 600: "#7c8e70", 700: "#5d6a54", 800: "#3e4738", 900: "#22271e" },
    emGradient: ["#aabc8c", "#9ab18c", "#3e4738"],
    shadowRgb: "154, 177, 140",
  },
  {
    id: "forest",
    label: "Forest",
    blurb: "Deep dark green",
    scale: { 100: "#d5e7da", 200: "#9fc9ad", 300: "#65a577", 400: "#317a47", 500: "#1f4d2f", 600: "#193f26", 700: "#13301d", 800: "#0c2013", 900: "#06120a" },
    emGradient: ["#65a577", "#1f4d2f", "#0c2013"],
    shadowRgb: "31, 77, 47",
  },
  {
    id: "emerald",
    label: "Emerald",
    blurb: "Brilliant jewel green",
    scale: { 100: "#d4f3e4", 200: "#9be3c1", 300: "#5ccf9a", 400: "#2cb47e", 500: "#0f9d68", 600: "#0c8055", 700: "#096040", 800: "#06402a", 900: "#032417" },
    emGradient: ["#5ccf9a", "#0f9d68", "#06402a"],
    shadowRgb: "15, 157, 104",
  },
  {
    id: "neon",
    label: "Neon",
    blurb: "Electric LED-hose green",
    scale: { 100: "#e6ffe1", 200: "#b6ffae", 300: "#7dff77", 400: "#3eff4a", 500: "#1eff3a", 600: "#0fd328", 700: "#0a9b1d", 800: "#076713", 900: "#03350a" },
    emGradient: ["#7dff77", "#1eff3a", "#0a9b1d"],
    shadowRgb: "30, 255, 58",
  },
  {
    id: "lime",
    label: "Lime",
    blurb: "Acid yellow-green",
    scale: { 100: "#edf6cd", 200: "#d6e996", 300: "#bcd862", 400: "#a8cb3a", 500: "#9bbf2a", 600: "#7e9b22", 700: "#5e7419", 800: "#3f4e11", 900: "#222a08" },
    emGradient: ["#bcd862", "#9bbf2a", "#3f4e11"],
    shadowRgb: "155, 191, 42",
  },
  {
    id: "chartreuse",
    label: "Chartreuse",
    blurb: "Yellow-green · vivid",
    scale: { 100: "#f1f5ca", 200: "#e0e98f", 300: "#cbd757", 400: "#c4d12c", 500: "#bccc1f", 600: "#98a519", 700: "#717b13", 800: "#4c520c", 900: "#292c06" },
    emGradient: ["#cbd757", "#bccc1f", "#4c520c"],
    shadowRgb: "188, 204, 31",
  },
  {
    id: "moss",
    label: "Moss",
    blurb: "Dark forest-floor green",
    scale: { 100: "#e0e7c8", 200: "#bdcb96", 300: "#94a766", 400: "#728644", 500: "#5e7138", 600: "#4c5b2d", 700: "#394421", 800: "#262d16", 900: "#15190c" },
    emGradient: ["#94a766", "#5e7138", "#262d16"],
    shadowRgb: "94, 113, 56",
  },

  // ---- Blues / cyans ----
  {
    id: "teal",
    label: "Teal",
    blurb: "Deep aquatic green-blue",
    scale: { 100: "#d2eded", 200: "#9ad9d7", 300: "#5cc0bf", 400: "#28a09e", 500: "#1c8a87", 600: "#16706e", 700: "#105452", 800: "#0a3837", 900: "#051f1e" },
    emGradient: ["#5cc0bf", "#1c8a87", "#0a3837"],
    shadowRgb: "28, 138, 135",
  },
  {
    id: "cyan",
    label: "Cyan",
    blurb: "Vivid aqua",
    scale: { 100: "#d3f1f5", 200: "#9be0e7", 300: "#5ccdd7", 400: "#26bbc7", 500: "#0fb0c0", 600: "#0c8f9d", 700: "#096b76", 800: "#06484f", 900: "#03282c" },
    emGradient: ["#5ccdd7", "#0fb0c0", "#06484f"],
    shadowRgb: "15, 176, 192",
  },
  {
    id: "sky",
    label: "Sky",
    blurb: "Bright light blue",
    scale: { 100: "#dceefb", 200: "#aed7f4", 300: "#7fbeec", 400: "#6cb1e5", 500: "#5fa9e0", 600: "#4c89b6", 700: "#3a6688", 800: "#26445b", 900: "#142532" },
    emGradient: ["#7fbeec", "#5fa9e0", "#26445b"],
    shadowRgb: "95, 169, 224",
  },
  {
    id: "azure",
    label: "Azure",
    blurb: "Confident clear blue",
    scale: { 100: "#d6e8fa", 200: "#a1c8f2", 300: "#67a4e8", 400: "#3389e2", 500: "#1e7adf", 600: "#1862b3", 700: "#124a86", 800: "#0c3158", 900: "#061a30" },
    emGradient: ["#67a4e8", "#1e7adf", "#0c3158"],
    shadowRgb: "30, 122, 223",
  },
  {
    id: "cobalt",
    label: "Cobalt",
    blurb: "Industrial deep blue",
    scale: { 100: "#d5dcf2", 200: "#a3afe0", 300: "#6e7fcc", 400: "#3953b3", 500: "#1c3fa5", 600: "#173384", 700: "#112664", 800: "#0b1942", 900: "#060e24" },
    emGradient: ["#6e7fcc", "#1c3fa5", "#0b1942"],
    shadowRgb: "28, 63, 165",
  },
  {
    id: "navy",
    label: "Navy",
    blurb: "Inky midnight",
    scale: { 100: "#d3d9e6", 200: "#a1abc6", 300: "#6a78a2", 400: "#384677", 500: "#152a5e", 600: "#11224c", 700: "#0d1a39", 800: "#081126", 900: "#040814" },
    emGradient: ["#6a78a2", "#152a5e", "#081126"],
    shadowRgb: "21, 42, 94",
  },
  {
    id: "indigo",
    label: "Indigo",
    blurb: "Mystical violet-blue",
    scale: { 100: "#dcdcef", 200: "#b0b0d8", 300: "#8181bd", 400: "#52529e", 500: "#3a3b8e", 600: "#2f3072", 700: "#232456", 800: "#171739", 900: "#0b0c1f" },
    emGradient: ["#8181bd", "#3a3b8e", "#171739"],
    shadowRgb: "58, 59, 142",
  },
  {
    id: "periwinkle",
    label: "Periwinkle",
    blurb: "Soft lilac-blue",
    scale: { 100: "#e8e9f7", 200: "#cdd0ee", 300: "#a8addf", 400: "#9197dc", 500: "#8a8fd4", 600: "#6e72ac", 700: "#525682", 800: "#373958", 900: "#1d1e30" },
    emGradient: ["#a8addf", "#8a8fd4", "#373958"],
    shadowRgb: "138, 143, 212",
  },
  {
    id: "steel",
    label: "Steel",
    blurb: "Cool gray-blue",
    scale: { 100: "#e2e6ea", 200: "#c4cad2", 300: "#9aa4af", 400: "#76838f", 500: "#5e6f7e", 600: "#4b5a66", 700: "#37434c", 800: "#252c33", 900: "#13181b" },
    emGradient: ["#9aa4af", "#5e6f7e", "#252c33"],
    shadowRgb: "94, 111, 126",
  },

  // ---- Purples ----
  {
    id: "lavender",
    label: "Lavender",
    blurb: "Soft pastel purple",
    scale: { 100: "#ebe5f5", 200: "#d2c5e8", 300: "#b9aade", 400: "#a99cd8", 500: "#a89bd4", 600: "#867dad", 700: "#645d82", 800: "#423e57", 900: "#23222e" },
    emGradient: ["#b9aade", "#a89bd4", "#423e57"],
    shadowRgb: "168, 155, 212",
  },
  {
    id: "violet",
    label: "Violet",
    blurb: "Saturated purple",
    scale: { 100: "#e7d8f3", 200: "#caa8e2", 300: "#a874cf", 400: "#8854c1", 500: "#7a44b8", 600: "#623795", 700: "#492a70", 800: "#311c4a", 900: "#1a0f28" },
    emGradient: ["#a874cf", "#7a44b8", "#311c4a"],
    shadowRgb: "122, 68, 184",
  },
  {
    id: "aubergine",
    label: "Aubergine",
    blurb: "Eggplant · moody dark",
    scale: { 100: "#e4d6e7", 200: "#bf9cc4", 300: "#9168a0", 400: "#643b72", 500: "#4d2a52", 600: "#3e2243", 700: "#2f1a32", 800: "#1f1122", 900: "#100813" },
    emGradient: ["#9168a0", "#4d2a52", "#1f1122"],
    shadowRgb: "77, 42, 82",
  },

  // ---- Very dark neutrals ----
  {
    id: "graphite",
    label: "Graphite",
    blurb: "Very dark gray",
    scale: { 100: "#dbdcde", 200: "#b6b8bd", 300: "#8a8d93", 400: "#5d6066", 500: "#36383b", 600: "#2b2d30", 700: "#202124", 800: "#151618", 900: "#0a0a0c" },
    emGradient: ["#8a8d93", "#36383b", "#0a0a0c"],
    shadowRgb: "54, 56, 59",
  },
  {
    id: "charcoal",
    label: "Charcoal",
    blurb: "Burned wood black",
    scale: { 100: "#d8d8da", 200: "#b1b1b3", 300: "#86868a", 400: "#56565a", 500: "#2a2a2c", 600: "#222224", 700: "#19191b", 800: "#101012", 900: "#070708" },
    emGradient: ["#86868a", "#2a2a2c", "#070708"],
    shadowRgb: "42, 42, 44",
  },
];

/* ---------- Fonts ---------- */

type Font = {
  id: string;
  label: string;
  family: string;
  /** Optional axis tuning applied as inline `fontVariationSettings`. */
  variationSettings?: string;
  weight?: number;
};

const FONTS: Font[] = [
  // ---- Original 7 ----
  {
    id: "instrument",
    label: "Instrument Serif",
    family: "'Instrument Serif', Georgia, serif",
  },
  {
    id: "fraunces",
    label: "Fraunces",
    family: "'Fraunces', 'Instrument Serif', Georgia, serif",
    variationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1",
    weight: 360,
  },
  {
    id: "newsreader",
    label: "Newsreader",
    family: "'Newsreader', 'Instrument Serif', Georgia, serif",
    variationSettings: "'opsz' 60",
    weight: 400,
  },
  {
    id: "italiana",
    label: "Italiana",
    family: "'Italiana', 'Instrument Serif', Georgia, serif",
    weight: 400,
  },
  {
    id: "playfair",
    label: "Playfair Display",
    family: "'Playfair Display', 'Instrument Serif', Georgia, serif",
    weight: 400,
  },
  {
    id: "cormorant",
    label: "Cormorant Garamond",
    family: "'Cormorant Garamond', 'Instrument Serif', Georgia, serif",
    weight: 400,
  },
  {
    id: "ebgaramond",
    label: "EB Garamond",
    family: "'EB Garamond', 'Instrument Serif', Georgia, serif",
    weight: 400,
  },

  // ---- Serif additions ----
  {
    id: "crimson-pro",
    label: "Crimson Pro",
    family: "'Crimson Pro', 'Instrument Serif', Georgia, serif",
    weight: 400,
  },
  {
    id: "lora",
    label: "Lora",
    family: "'Lora', 'Instrument Serif', Georgia, serif",
    weight: 400,
  },
  {
    id: "source-serif",
    label: "Source Serif Pro",
    family: "'Source Serif 4', 'Source Serif Pro', 'Instrument Serif', Georgia, serif",
    weight: 400,
  },
  {
    id: "spectral",
    label: "Spectral",
    family: "'Spectral', 'Instrument Serif', Georgia, serif",
    weight: 400,
  },
  {
    id: "libre-caslon",
    label: "Libre Caslon Text",
    family: "'Libre Caslon Text', 'Instrument Serif', Georgia, serif",
    weight: 400,
  },
  {
    id: "libre-baskerville",
    label: "Libre Baskerville",
    family: "'Libre Baskerville', 'Instrument Serif', Georgia, serif",
    weight: 400,
  },
  {
    id: "dm-serif",
    label: "DM Serif Display",
    family: "'DM Serif Display', 'Instrument Serif', Georgia, serif",
    weight: 400,
  },
  {
    id: "bodoni-moda",
    label: "Bodoni Moda",
    family: "'Bodoni Moda', 'Instrument Serif', Georgia, serif",
    variationSettings: "'opsz' 96",
    weight: 400,
  },
  {
    id: "marcellus",
    label: "Marcellus",
    family: "'Marcellus', 'Instrument Serif', Georgia, serif",
    weight: 400,
  },
  {
    id: "sorts-mill",
    label: "Sorts Mill Goudy",
    family: "'Sorts Mill Goudy', 'Instrument Serif', Georgia, serif",
    weight: 400,
  },

  // ---- Sans additions ----
  {
    id: "inter",
    label: "Inter",
    family: "'Inter', system-ui, sans-serif",
    weight: 500,
  },
  {
    id: "geist",
    label: "Geist",
    family: "'Geist', system-ui, sans-serif",
    weight: 500,
  },
  {
    id: "space-grotesk",
    label: "Space Grotesk",
    family: "'Space Grotesk', system-ui, sans-serif",
    weight: 500,
  },
  {
    id: "bricolage",
    label: "Bricolage Grotesque",
    family: "'Bricolage Grotesque', system-ui, sans-serif",
    weight: 500,
  },
  {
    id: "manrope",
    label: "Manrope",
    family: "'Manrope', system-ui, sans-serif",
    weight: 500,
  },
  {
    id: "jakarta",
    label: "Plus Jakarta Sans",
    family: "'Plus Jakarta Sans', system-ui, sans-serif",
    weight: 500,
  },

  // ---- Mono ----
  {
    id: "jetbrains-mono",
    label: "JetBrains Mono",
    family: "'JetBrains Mono', ui-monospace, monospace",
    weight: 500,
  },
  {
    id: "ibm-plex-mono",
    label: "IBM Plex Mono",
    family: "'IBM Plex Mono', ui-monospace, monospace",
    weight: 500,
  },

  // ---- Handwritten ----
  {
    id: "caveat",
    label: "Caveat",
    family: "'Caveat', cursive",
    weight: 500,
  },
  {
    id: "dancing-script",
    label: "Dancing Script",
    family: "'Dancing Script', cursive",
    weight: 500,
  },
];

// All Google Fonts in a single CSS2 request. We keep this manually composed so
// each face only loads the weight/italic ranges we actually need.
const GOOGLE_FONTS_HREF =
  "https://fonts.googleapis.com/css2" +
  // serifs (original 6)
  "?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,100..900,0..100,0..1;1,9..144,100..900,0..100,0..1" +
  "&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800" +
  "&family=Italiana" +
  "&family=Playfair+Display:ital,wght@0,400..900;1,400..900" +
  "&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600" +
  "&family=EB+Garamond:ital,wght@0,400..800;1,400..800" +
  // serif additions
  "&family=Crimson+Pro:ital,wght@0,400..700;1,400..700" +
  "&family=Lora:ital,wght@0,400..700;1,400..700" +
  "&family=Source+Serif+4:ital,opsz,wght@0,8..60,400..700;1,8..60,400..700" +
  "&family=Spectral:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600" +
  "&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400" +
  "&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400" +
  "&family=DM+Serif+Display:ital@0;1" +
  "&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900" +
  "&family=Marcellus" +
  "&family=Sorts+Mill+Goudy:ital@0;1" +
  // sans
  "&family=Inter:wght@300..700" +
  "&family=Geist:wght@300..700" +
  "&family=Space+Grotesk:wght@300..700" +
  "&family=Bricolage+Grotesque:opsz,wght@12..96,200..800" +
  "&family=Manrope:wght@300..700" +
  "&family=Plus+Jakarta+Sans:ital,wght@0,300..700;1,300..700" +
  // mono
  "&family=JetBrains+Mono:ital,wght@0,400..700;1,400..700" +
  "&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400" +
  // handwritten
  "&family=Caveat:wght@400..700" +
  "&family=Dancing+Script:wght@400..700" +
  "&display=swap";

/* ---------- Helpers ---------- */

/**
 * WCAG relative luminance of a hex color (sRGB → linear → weighted sum).
 * Returns 0 (black) to 1 (white).
 */
function relativeLuminance(hex: string): number {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16) / 255;
  const g = parseInt(m.slice(2, 4), 16) / 255;
  const b = parseInt(m.slice(4, 6), 16) / 255;
  const lin = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** Luminance below which a palette's 500 is considered "dark" for button text.
 *  Tuned so Ember (L≈0.299) keeps its near-black ink, while mid-grays (L≈0.25)
 *  and below flip to white. The spec suggested 0.5 but that would flip Ember
 *  itself — which is the canonical "bright ember w/ dark ink" reference. */
const BUTTON_TEXT_DARK_THRESHOLD = 0.28;
/** Luminance below which the hero italic gradient is shifted to lighter stops. */
const GRADIENT_INVERT_THRESHOLD = 0.35;

/** White ink for dark palettes, near-black for light palettes. */
function primaryButtonTextColor(p: Palette): string {
  return relativeLuminance(p.scale[500]) < BUTTON_TEXT_DARK_THRESHOLD
    ? "#f6f1e6" // var(--ink-50)
    : "#07070a"; // var(--ink-1000)
}

/**
 * Returns the three gradient stops to use for the hero italic `em`.
 * For dark palettes we shift to the lighter `[200, 300, 400]` band so the
 * gradient stays visible against the dark page background.
 */
function heroGradientStops(p: Palette): [string, string, string] {
  if (relativeLuminance(p.scale[500]) < GRADIENT_INVERT_THRESHOLD) {
    return [p.scale[200], p.scale[300], p.scale[400]];
  }
  return p.emGradient;
}

/**
 * Color used for the gradient's `drop-shadow` halo. On dark palettes we use
 * scale[300] so the glow actually reads on the near-black page bg; on light
 * palettes we keep the original shadowRgb.
 */
function heroGradientHalo(p: Palette): string {
  if (relativeLuminance(p.scale[500]) < GRADIENT_INVERT_THRESHOLD) {
    // Convert scale[300] hex to "r, g, b" for rgba()
    const m = p.scale[300].replace("#", "");
    const r = parseInt(m.slice(0, 2), 16);
    const g = parseInt(m.slice(2, 4), 16);
    const b = parseInt(m.slice(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }
  return p.shadowRgb;
}

/** Chip text color on dark palettes is bumped one step lighter for readability. */
function chipEmberTextVar(p: Palette): string {
  return relativeLuminance(p.scale[500]) < GRADIENT_INVERT_THRESHOLD
    ? "var(--ember-200)"
    : "var(--ember-300)";
}

/**
 * Mix two hex colors in linear-light sRGB so saturated tints don't muddy the
 * base. `amount=0` returns `base`; `amount=1` returns `tint`. Used to gently
 * shift the canonical dark-neutral ink scale toward the active palette hue
 * (~6-12%), so cards/page surfaces feel like the palette's world without
 * losing their dark-first identity.
 */
function mixHex(base: string, tint: string, amount: number): string {
  const parse = (h: string): [number, number, number] => {
    const m = h.replace("#", "");
    return [
      parseInt(m.slice(0, 2), 16),
      parseInt(m.slice(2, 4), 16),
      parseInt(m.slice(4, 6), 16),
    ];
  };
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const srgb = (l: number) => {
    const s = l <= 0.0031308 ? 12.92 * l : 1.055 * Math.pow(l, 1 / 2.4) - 0.055;
    return Math.round(Math.max(0, Math.min(1, s)) * 255);
  };
  const a = parse(base).map(lin);
  const b = parse(tint).map(lin);
  const mixed = a.map((x, i) => x * (1 - amount) + b[i] * amount);
  return (
    "#" +
    mixed
      .map(srgb)
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
  );
}

/**
 * HSL saturation of a hex color, 0-1. Used to guard against very saturated
 * palettes (Neon, Cherry, Magenta) overwhelming the surface mix.
 */
function hexSaturation(hex: string): number {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16) / 255;
  const g = parseInt(m.slice(2, 4), 16) / 255;
  const b = parseInt(m.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return 0;
  const d = max - min;
  return l > 0.5 ? d / (2 - max - min) : d / (max + min);
}

/** Canonical dark-neutral ink values that the surface tint mixes against. */
const CANON_INK_900 = "#0e0d0c";
const CANON_INK_850 = "#16140f";
const CANON_INK_800 = "#1c1916";
const CANON_INK_700 = "#2a2622";

/**
 * Per-palette surface-tint amounts. Halved when the palette[500] is very
 * saturated OR very light/very dark, both of which can otherwise read as a
 * colored gel over the ink scale rather than a subtle hue shift.
 */
function surfaceTintAmounts(p: Palette): {
  ink900: number;
  ink850: number;
  ink800: number;
  ink700: number;
  guarded: boolean;
} {
  const sat = hexSaturation(p.scale[500]);
  const lum = relativeLuminance(p.scale[500]);
  // Halve mix amount for highly saturated, very dark, or light 500s. Light
  // palettes need the guard most aggressively because linear-light mixing
  // weights bright colors heavily — a 10% mix of Cream into near-black ink
  // produces a noticeably olive surface without it.
  const guarded = sat > 0.6 || lum < 0.04 || lum > 0.4;
  const scale = guarded ? 0.5 : 1;
  return {
    ink900: 0.07 * scale,
    ink850: 0.08 * scale,
    ink800: 0.1 * scale,
    ink700: 0.12 * scale,
    guarded,
  };
}

function paletteOverrideCss(p: Palette): string {
  // Scope every token override under .theme-<id>. Same approach as the old
  // /palette page.
  const buttonText = primaryButtonTextColor(p);
  // Solid-color tint for the hero italic `em`. We previously emitted a
  // linear-gradient with background-clip:text, but Bricolage Grotesque's
  // italic clipped descenders no matter how much padding we added — the
  // canonical CSS now uses a flat `color` + drop-shadow halo, and per-palette
  // overrides must do the same to avoid re-introducing the clipping bug.
  // We reuse the middle stop of `heroGradientStops` because it already
  // handles dark-palette inversion (uses scale[300] instead of scale[500]).
  const emTint = heroGradientStops(p)[1];
  const haloRgb = heroGradientHalo(p);
  const chipColor = chipEmberTextVar(p);

  // Subtle surface tinting: mix the canonical ink scale with palette[500] in
  // linear sRGB so each palette's "world" whispers through the cards/page bg.
  const tintAmt = surfaceTintAmounts(p);
  const ink900 = mixHex(CANON_INK_900, p.scale[500], tintAmt.ink900);
  const ink850 = mixHex(CANON_INK_850, p.scale[500], tintAmt.ink850);
  const ink800 = mixHex(CANON_INK_800, p.scale[500], tintAmt.ink800);
  const ink700 = mixHex(CANON_INK_700, p.scale[500], tintAmt.ink700);

  return `
.theme-${p.id} {
  --ember-100: ${p.scale[100]};
  --ember-200: ${p.scale[200]};
  --ember-300: ${p.scale[300]};
  --ember-400: ${p.scale[400]};
  --ember-500: ${p.scale[500]};
  --ember-600: ${p.scale[600]};
  --ember-700: ${p.scale[700]};
  --ember-800: ${p.scale[800]};
  --ember-900: ${p.scale[900]};

  --color-accent:       var(--ember-500);
  --color-accent-hover: var(--ember-400);
  --color-accent-press: var(--ember-600);
  --color-accent-soft:  rgba(${p.shadowRgb}, 0.14);

  --color-link:         var(--ember-300);
  --color-link-hover:   var(--ember-200);

  --shadow-ember:       0 0 32px rgba(${p.shadowRgb}, 0.22), 0 8px 24px rgba(0,0,0,0.45);
  --color-selection-bg: var(--ember-500);

  /* Surface tint — whisper the palette hue into the dark-neutral ink scale.
     Mixed in linear sRGB so saturated palettes don't muddy. */
  --ink-900: ${ink900};
  --ink-850: ${ink850};
  --ink-800: ${ink800};
  --ink-700: ${ink700};

  --color-border:        rgba(${p.shadowRgb}, 0.10);
  --color-border-strong: rgba(${p.shadowRgb}, 0.18);
  --color-divider:       rgba(${p.shadowRgb}, 0.08);
}

/* Ambient gradient — replaces the canonical body::before warm-ember wash.
   The lab preview is positioned, so we paint our own pseudo at the section. */
.theme-${p.id} {
  position: relative;
  isolation: isolate;
}
.theme-${p.id}::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  background:
    radial-gradient(ellipse 80% 50% at 10% -5%, rgba(${p.shadowRgb}, 0.10), transparent 60%),
    radial-gradient(ellipse 60% 40% at 90% 0%, rgba(${p.shadowRgb}, 0.06), transparent 65%);
}

.theme-${p.id} .ws-btn-primary,
.theme-${p.id} .ws-btn-primary:hover,
.theme-${p.id} .ws-btn-primary:active,
.theme-${p.id} a.ws-btn-primary,
.theme-${p.id} a.ws-btn-primary:hover,
.theme-${p.id} a.ws-btn-primary:active {
  color: ${buttonText};
}

.theme-${p.id} .ws-hero-title em {
  color: ${emTint};
  filter: drop-shadow(0 0 22px rgba(${haloRgb}, 0.40));
}

.theme-${p.id} .ws-chip-ember {
  background: rgba(${p.shadowRgb}, 0.10);
  border-color: rgba(${p.shadowRgb}, 0.35);
  color: ${chipColor};
}
.theme-${p.id} .ws-chip-ember .ws-chip-dot {
  background: var(--ember-400);
  box-shadow: 0 0 8px rgba(${p.shadowRgb}, 0.8);
}

.theme-${p.id} .ws-work-cell-glow {
  background: radial-gradient(circle 280px at var(--mx, 50%) var(--my, 50%), rgba(${p.shadowRgb}, 0.18), transparent 70%);
}

.theme-${p.id} .ws-tag:hover {
  border-color: rgba(${p.shadowRgb}, 0.4);
  color: ${chipColor};
}
`;
}

/* ---------- localStorage keys + defaults ---------- */

const LS_PALETTE = "lab:palette";
const LS_FONT = "lab:font";
const DEFAULT_PALETTE_ID = "pine";
const DEFAULT_FONT_ID = "playfair";

/* ---------- Chip primitives ---------- */

function PaletteChip({
  palette,
  selected,
  onSelect,
}: {
  palette: Palette;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 14px 8px 10px",
        borderRadius: 999,
        border: selected
          ? "1px solid var(--ember-400)"
          : "1px solid var(--color-border-strong)",
        background: selected ? "rgba(255,255,255,0.04)" : "transparent",
        color: "var(--color-fg)",
        fontFamily: "var(--font-sans)",
        fontSize: 13,
        cursor: "pointer",
        transition: "all 160ms var(--ease-out)",
        boxShadow: selected ? "var(--shadow-ember)" : "none",
      }}
    >
      <span
        aria-hidden
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: palette.scale[500],
          boxShadow: `0 0 0 1px rgba(255,255,255,0.12), 0 0 10px ${palette.scale[500]}66`,
          flex: "0 0 auto",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: primaryButtonTextColor(palette),
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: 0,
        }}
      >
        T
      </span>
      <span style={{ fontWeight: 500 }}>{palette.label}</span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--color-fg-subtle)",
          letterSpacing: "0.04em",
        }}
      >
        {palette.scale[500]}
      </span>
    </button>
  );
}

function FontChip({
  font,
  selected,
  onSelect,
}: {
  font: Font;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: 8,
        padding: "8px 14px",
        borderRadius: 999,
        border: selected
          ? "1px solid var(--ember-400)"
          : "1px solid var(--color-border-strong)",
        background: selected ? "rgba(255,255,255,0.04)" : "transparent",
        color: "var(--color-fg)",
        cursor: "pointer",
        transition: "all 160ms var(--ease-out)",
        boxShadow: selected ? "var(--shadow-ember)" : "none",
      }}
    >
      <span
        style={{
          fontFamily: font.family,
          fontVariationSettings: font.variationSettings,
          fontWeight: font.weight ?? 400,
          fontSize: 18,
          lineHeight: 1,
        }}
      >
        {font.label}
      </span>
    </button>
  );
}

/* Tiny ember-bordered monospace search input. */
function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        appearance: "none",
        background: "rgba(0,0,0,0.25)",
        border: "1px solid var(--ember-400)",
        borderRadius: 6,
        color: "var(--color-fg)",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.04em",
        padding: "5px 10px",
        outline: "none",
        width: 180,
        boxShadow: "0 0 0 0 transparent",
      }}
    />
  );
}

/* ---------- Page ---------- */

export default function LabPage() {
  // Initial state uses Gray + Playfair so SSR and first paint match. After
  // mount we read localStorage and reconcile.
  const [paletteId, setPaletteId] = useState<string>(DEFAULT_PALETTE_ID);
  const [fontId, setFontId] = useState<string>(DEFAULT_FONT_ID);
  const [paletteQuery, setPaletteQuery] = useState("");
  const [fontQuery, setFontQuery] = useState("");

  // Hydrate selection from localStorage on mount only.
  useEffect(() => {
    try {
      const storedPalette = window.localStorage.getItem(LS_PALETTE);
      if (storedPalette && PALETTES.some((p) => p.id === storedPalette)) {
        setPaletteId(storedPalette);
      }
      const storedFont = window.localStorage.getItem(LS_FONT);
      if (storedFont && FONTS.some((f) => f.id === storedFont)) {
        setFontId(storedFont);
      }
    } catch {
      // localStorage may be unavailable (privacy mode); fall back to defaults.
    }
  }, []);

  // Persist whenever the user picks something new.
  useEffect(() => {
    try {
      window.localStorage.setItem(LS_PALETTE, paletteId);
    } catch {
      /* ignore */
    }
  }, [paletteId]);

  useEffect(() => {
    try {
      window.localStorage.setItem(LS_FONT, fontId);
    } catch {
      /* ignore */
    }
  }, [fontId]);

  const palette =
    PALETTES.find((p) => p.id === paletteId) ??
    PALETTES.find((p) => p.id === DEFAULT_PALETTE_ID) ??
    PALETTES[0];
  const font =
    FONTS.find((f) => f.id === fontId) ??
    FONTS.find((f) => f.id === DEFAULT_FONT_ID) ??
    FONTS[0];

  const scopedCss = useMemo(() => paletteOverrideCss(palette), [palette]);

  const filteredPalettes = useMemo(() => {
    const q = paletteQuery.trim().toLowerCase();
    if (!q) return PALETTES;
    return PALETTES.filter(
      (p) =>
        p.label.toLowerCase().includes(q) || p.id.toLowerCase().includes(q),
    );
  }, [paletteQuery]);

  const filteredFonts = useMemo(() => {
    const q = fontQuery.trim().toLowerCase();
    if (!q) return FONTS;
    return FONTS.filter(
      (f) =>
        f.label.toLowerCase().includes(q) || f.id.toLowerCase().includes(q),
    );
  }, [fontQuery]);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href={GOOGLE_FONTS_HREF} />

      <style
        // eslint-disable-next-line react/no-unknown-property
        dangerouslySetInnerHTML={{ __html: scopedCss }}
      />

      <main
        style={{
          minHeight: "100vh",
          background: "var(--ink-1000)",
          color: "var(--color-fg)",
        }}
      >
        {/* ---------- Sticky control bar ---------- */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            background: "rgba(14,13,12,0.7)",
            borderBottom: "1px solid var(--color-border-strong)",
          }}
        >
          <div
            style={{
              maxWidth: 1440,
              margin: "0 auto",
              padding: "16px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ember-300)",
                }}
              >
                Lab · {palette.label} × {font.label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  color: "var(--color-fg-subtle)",
                }}
              >
                {PALETTES.length} palettes · {FONTS.length} fonts · persisted in
                localStorage
              </span>
            </div>

            {/* Palette section */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-fg-subtle)",
                    width: 64,
                  }}
                >
                  palette
                </span>
                <SearchInput
                  value={paletteQuery}
                  onChange={setPaletteQuery}
                  placeholder="filter palettes…"
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--color-fg-subtle)",
                  }}
                >
                  {filteredPalettes.length}/{PALETTES.length}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  maxHeight: "50vh",
                  overflowY: "auto",
                  padding: "4px 2px",
                }}
              >
                {filteredPalettes.map((p) => (
                  <PaletteChip
                    key={p.id}
                    palette={p}
                    selected={p.id === palette.id}
                    onSelect={() => setPaletteId(p.id)}
                  />
                ))}
                {filteredPalettes.length === 0 && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--color-fg-subtle)",
                      padding: "8px 0",
                    }}
                  >
                    no matches
                  </span>
                )}
              </div>
            </div>

            {/* Font section */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-fg-subtle)",
                    width: 64,
                  }}
                >
                  font
                </span>
                <SearchInput
                  value={fontQuery}
                  onChange={setFontQuery}
                  placeholder="filter fonts…"
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--color-fg-subtle)",
                  }}
                >
                  {filteredFonts.length}/{FONTS.length}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  maxHeight: "50vh",
                  overflowY: "auto",
                  padding: "4px 2px",
                }}
              >
                {filteredFonts.map((f) => (
                  <FontChip
                    key={f.id}
                    font={f}
                    selected={f.id === font.id}
                    onSelect={() => setFontId(f.id)}
                  />
                ))}
                {filteredFonts.length === 0 && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--color-fg-subtle)",
                      padding: "8px 0",
                    }}
                  >
                    no matches
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Preview ---------- */}
        <section
          className={`theme-${palette.id}`}
          style={
            {
              padding: "64px 32px 96px",
              ["--font-display" as string]: font.family,
            } as React.CSSProperties
          }
        >
          <div
            style={{
              maxWidth: 1240,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 56,
            }}
          >
            {/* Hero block */}
            <div
              style={{
                background: "var(--ink-900)",
                border: "1px solid var(--color-border-strong)",
                borderRadius: "var(--radius-xl)",
                padding: "72px 48px",
                textAlign: "center",
              }}
            >
              <span className="eyebrow" style={{ display: "block", marginBottom: 18 }}>
                Workshop · backlit shelf
              </span>
              <h1
                className="ws-hero-title"
                style={{
                  margin: 0,
                  fontVariationSettings: font.variationSettings,
                  fontWeight: font.weight ?? 400,
                }}
              >
                Gabriel <em>Taveira</em>.
              </h1>
              <p
                style={{
                  color: "var(--color-fg-muted)",
                  maxWidth: "56ch",
                  margin: "28px auto 36px",
                  fontSize: 17,
                  lineHeight: 1.55,
                }}
              >
                Designer-engineer building warm, editorial interfaces. This is
                a live mix of the chosen palette and display font &mdash; the
                rest of the site would inherit both.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <a className="ws-btn ws-btn-primary" href="#">
                  Get in touch
                </a>
                <a className="ws-btn ws-btn-secondary" href="#">
                  See the work
                </a>
                <span className="ws-chip ws-chip-ember">
                  <span className="ws-chip-dot" />
                  Available
                </span>
              </div>
            </div>

            {/* Work cells */}
            <div className="ws-work-grid">
              <article className="ws-work-cell">
                <div className="ws-work-cell-glow" />
                <div className="ws-work-cell-top">
                  <span className="ws-chip ws-chip-ember">
                    <span className="ws-chip-dot" />
                    Live
                  </span>
                </div>
                <h3 className="ws-work-cell-title">
                  Workshop &mdash; backlit shelf
                </h3>
                <p className="ws-work-cell-blurb">
                  A small editorial system for warm interfaces. Type, color,
                  motion, and ambient backlight studies in one place.
                </p>
                <div className="ws-work-cell-foot">
                  <div className="ws-work-cell-tags">
                    <span className="ws-tag">design</span>
                    <span className="ws-tag">tokens</span>
                  </div>
                  <span className="ws-work-cell-cta">View &rarr;</span>
                </div>
              </article>

              <article className="ws-work-cell">
                <div className="ws-work-cell-glow" />
                <div className="ws-work-cell-top">
                  <span className="ws-chip ws-chip-ember">
                    <span className="ws-chip-dot" />
                    Open source
                  </span>
                </div>
                <h3 className="ws-work-cell-title">
                  Library &mdash; field notes
                </h3>
                <p className="ws-work-cell-blurb">
                  Reading, writing and small experiments &mdash; bound together
                  in a slim shelf-side notebook.
                </p>
                <div className="ws-work-cell-foot">
                  <div className="ws-work-cell-tags">
                    <span className="ws-tag">notes</span>
                    <span className="ws-tag">essays</span>
                  </div>
                  <span className="ws-work-cell-cta">Read &rarr;</span>
                </div>
              </article>
            </div>

            {/* Misc row · buttons + chips + link */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                padding: "28px 32px",
                background: "var(--ink-900)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <span className="eyebrow">Bits & pieces</span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  flexWrap: "wrap",
                }}
              >
                <a className="ws-btn ws-btn-primary" href="#">
                  Primary
                </a>
                <a className="ws-btn ws-btn-secondary" href="#">
                  Secondary
                </a>
                <span className="ws-chip ws-chip-ember">
                  <span className="ws-chip-dot" />
                  Ember chip
                </span>
                <span className="ws-chip ws-chip-coral">
                  <span className="ws-chip-dot" />
                  Coral chip
                </span>
                <span className="ws-chip ws-chip-brass">
                  <span className="ws-chip-dot" />
                  Brass chip
                </span>
                <span className="ws-chip ws-chip-teal">
                  <span className="ws-chip-dot" />
                  Teal chip
                </span>
                <a href="#">gabrielstaveira@gmail.com</a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Scale strip ---------- */}
        <section
          style={{
            padding: "48px 32px 96px",
            borderTop: "1px solid var(--color-border)",
            background: "var(--ink-900)",
          }}
        >
          <div style={{ maxWidth: 1240, margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                marginBottom: 18,
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <span className="eyebrow">
                Scale · {palette.label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--color-fg-subtle)",
                  letterSpacing: "0.06em",
                }}
              >
                {palette.blurb}
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(9, 1fr)",
                gap: 8,
              }}
            >
              {(
                [100, 200, 300, 400, 500, 600, 700, 800, 900] as const
              ).map((step) => {
                const hex = palette.scale[step];
                const isPrimary = step === 500;
                return (
                  <div
                    key={step}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        height: 96,
                        borderRadius: "var(--radius-md)",
                        background: hex,
                        border: isPrimary
                          ? "1px solid rgba(255,255,255,0.25)"
                          : "1px solid rgba(255,255,255,0.06)",
                        boxShadow: isPrimary
                          ? "var(--shadow-ember)"
                          : "var(--shadow-glow-sm)",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        gap: 4,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          color: isPrimary
                            ? "var(--ember-300)"
                            : "var(--color-fg-muted)",
                          fontWeight: isPrimary ? 600 : 400,
                        }}
                      >
                        {step}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 10,
                          color: "var(--color-fg-subtle)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {hex}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
