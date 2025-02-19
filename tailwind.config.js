import { heroui } from '@heroui/react';

export default {
  content: ['./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  darkMode: 'class',
  plugins: [heroui()]
};
