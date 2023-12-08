/** @type {import("@trivago/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  importOrder: ["<THIRD_PARTY_MODULES>", "^(?!.*[.]css$)[.~].*$", ".css$"],
  importOrderSeparation: true,
  trailingComma: "all",
  semi: false,
  plugins: [
    require.resolve("@trivago/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
}

module.exports = config
