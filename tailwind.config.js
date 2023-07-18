/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: [
      {
        paywave: {
          primary: '#4942E4',
          secondary: '#FFFFFF',
          accent: '#ffffff',
          neutral: '#ffffff',
          'base-100': '#ffffff',
        },
      },
    ],
  },
  theme: {
    extend: {
      backgroundImage: {
        home: "url('../../public/bg-home.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
