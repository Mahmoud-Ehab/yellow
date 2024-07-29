module.exports = {
  packagerConfig: {
    name: "Yellow",
    asar: true,
    extraResource: [
      "./resources/web",
      "./resources/js"
    ],
    icon: "./public/icon.png"
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
