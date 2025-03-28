/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // extend: {
    //   colors: {
    //     // Add custom colors if needed
    //   },
    //   animation: {
    //     'fadeIn': 'fadeIn 0.5s ease-in-out forwards',
    //     'fadeOut': 'fadeOut 0.5s ease-in-out forwards',
    //     'slideInUp': 'slideInUp 0.5s ease-out forwards',
    //     'slideInDown': 'slideInDown 0.5s ease-out forwards',
    //     'slideInLeft': 'slideInLeft 0.5s ease-out forwards',
    //     'slideInRight': 'slideInRight 0.5s ease-out forwards',
    //     'scaleIn': 'scaleIn 0.3s ease-out forwards',
    //     'scaleOut': 'scaleOut 0.3s ease-out forwards',
    //     'keypress': 'keypress 0.3s ease-out',
    //   },
    //   keyframes: {
    //     fadeIn: {
    //       '0%': { opacity: '0' },
    //       '100%': { opacity: '1' },
    //     },
    //     fadeOut: {
    //       '0%': { opacity: '1' },
    //       '100%': { opacity: '0' },
    //     },
    //     slideInUp: {
    //       '0%': { transform: 'translateY(20px)', opacity: '0' },
    //       '100%': { transform: 'translateY(0)', opacity: '1' },
    //     },
    //     slideInDown: {
    //       '0%': { transform: 'translateY(-20px)', opacity: '0' },
    //       '100%': { transform: 'translateY(0)', opacity: '1' },
    //     },
    //     slideInLeft: {
    //       '0%': { transform: 'translateX(-20px)', opacity: '0' },
    //       '100%': { transform: 'translateX(0)', opacity: '1' },
    //     },
    //     slideInRight: {
    //       '0%': { transform: 'translateX(20px)', opacity: '0' },
    //       '100%': { transform: 'translateX(0)', opacity: '1' },
    //     },
    //     scaleIn: {
    //       '0%': { transform: 'scale(0.95)', opacity: '0' },
    //       '100%': { transform: 'scale(1)', opacity: '1' },
    //     },
    //     scaleOut: {
    //       '0%': { transform: 'scale(1)', opacity: '1' },
    //       '100%': { transform: 'scale(0.95)', opacity: '0' },
    //     },
    //     keypress: {
    //       '0%': { transform: 'scale(1)' },
    //       '50%': { transform: 'scale(0.9)', backgroundColor: 'rgba(59, 130, 246, 0.2)' },
    //       '100%': { transform: 'scale(1)' },
    //     },
    //   },
    //   boxShadow: {
    //     'phone': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.1)',
    //     '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
    //   }
    // },
  },
  plugins: [],
}
