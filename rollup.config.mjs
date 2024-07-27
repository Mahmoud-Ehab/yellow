// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

export default [
  // Compilations of screen files.
  {
    input: [
      './src/ui/screens/GetStartedScreen.tsx', 
      './src/ui/screens/HomeScreen.tsx'
    ],
    output: [
      {
        dir: 'js/ui/screens',
        format: 'cjs'
      }
    ],
    plugins: [
      commonjs(),
      typescript(),
    ],
    external: [
      'react',
      'react/jsx-runtime', 
      'react-native',
      'react-native-paper',
      'react-responsive',
      'expo-image',
      '@expo/match-media',
      'expo-image-picker',
      '../../inits/globals.init',
      '../../inits/screensNavigator.init',
      '../../inits/notifier.init',
    ]
  },

  // Compilations of init files.
	{
		input: [
      "./src/inits/globals.init.ts",
      "./src/inits/screensNavigator.init.ts",
      "./src/inits/notifier.init.ts",
    ],
		output: [
			{
				dir: "js/inits",
				format: "cjs"
			}
		],
		plugins: [
      commonjs(),
      typescript(),
    ]
	},

  // Compilations for nodeApp.js
  {
		input: [
      "./src/server.ts",
    ],
		output: [
			{
				dir: "js",
				format: "esm",
        entryFileNames: "[name].mjs",
			}
		],
		plugins: [
      typescript(),
    ],
    external: [
      "fs",
      "cracksdb",
      "express",
      "http",
      "cors",
      "body-parser",
      "path",
      "sharp",
      "url"
    ]
	},
];  
