/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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
        home: "url('../public/bg-home.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('daisyui')],
}
