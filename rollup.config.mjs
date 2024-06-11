// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

export default [
    {
      input: [
        './src/screens/SplashScreen.tsx', 
        './src/screens/HomeScreen.tsx'
      ],
      output: [
        {
          dir: 'js/screens',
          format: 'cjs'
        }
      ],
      plugins: [
        commonjs(),
        typescript(),
      ],
      external: [
        'react/jsx-runtime', 
        'react-native',
        'expo-image',
        '../inits/globals.init',
        '../inits/screensNavigator.init',
        '../inits/notifier.init',
      ]
    },
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
	}
];  
