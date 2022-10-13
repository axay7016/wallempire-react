module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            backgroundImage: {
                "wallpaper": "url('https://wall-empire.s3.ap-south-1.amazonaws.com/home/01.jpg')",
                "blinds": "url('https://wall-empire.s3.ap-south-1.amazonaws.com/Other_Image/lANDING+PAGE+PHOTO+(2).jpg')",
                "curtains": "url('https://wall-empire.s3.ap-south-1.amazonaws.com/home/01.jpg')",
                "cushions": "url('https://wall-empire.s3.ap-south-1.amazonaws.com/home/01.jpg')",
                "canvas": "url('https://wall-empire.s3.ap-south-1.amazonaws.com/home/01.jpg')",
            },
            // backgroundImage: {
            //     "wallpaper":"",
            //     "blinds":"",
            //     "curtains": "",
            //     "cushions": "",
            //     "canvas": "url('https://wall-empire.s3.ap-south-1.amazonaws.com/home/01.jpg')",
            // },
            translate: {
                '1/7': '14.2857143%',
                '2/7': '28.5714286%',
                '3/7': '42.8571429%',
                '4/7': '57.1428571%',
                '5/7': '71.4285714%',
                '6/7': '85.7142857%',
            },
            spacing: {
                '128': '40rem',
            }
        },
    },
    variants: {
        extend: {},
    },
    content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
    plugins: [
        require('tw-elements/dist/plugin')
    ],
}
