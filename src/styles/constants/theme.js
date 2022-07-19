const colors = {
    accent: "#F3534A",
    primary: "rgba(3, 155, 229, 0.5)",
    simandra:"#0049AD",
    pnbp:"#5271ff",
    secondary: "#039BE5",
    statusbar: "#81CDF2",
    green: '#33cc33',
    yellow:'#eedc4a',
    orange: 'orange',
    black: "#323643",
    midblack: '#333333',
    text:'#636667',
    white: "#FFFFFF",
    gray: "#9DA3B4",
    gray2: "#C5CCD6",
    gray3: '#7A7a7a',
    bordertempatFoto:'rgba(1, 73, 172, 0.25)',
    borderFoto:'#81CDF2',
    border: '#E8E9ED'
};

const sizes = {
    // global sizes
    base: 16,
    font: 14,
    radius: 6,
    padding: 25,

    // font sizes
    h1: 26,
    h2: 20,
    h3: 18,
    title: 18,
    header: 16,
    body: 14,
    caption: 12,
};

const fonts = {
    h1: {
        fontSize: sizes.h1
    },
    h2: {
        fontSize: sizes.h2
    },
    h3: {
        fontSize: sizes.h3,
    },
    rebesth3: {
        fontSize: sizes.h3,
        fontFamily: 'fontastique'
    },
    header: {
        fontSize: sizes.header
    },
    title: {
        fontSize: sizes.title
    },
    body: {
        fontSize: sizes.body
    },
    caption: {
        fontSize: sizes.caption
    },
};
const colorsHeader = {
    accent: "#F72B2B",
    primary: "#D61B1F",
    secondary: "#3A3232",
    tertiary: "#ED6004",
    black: "#000000",
    white: "#FFFFFF",
    gray: "#D9D2D2",
    gray2: "#F6F5F5",
};

const sizesHeader = {
    // global sizes
    base: 12,
    font: 12,
    border: 10,

    // font sizes
    h1: 32,
    h2: 26,
    h3: 18,
    title: 16,
    body: 12,
    caption: 12,
    small: 8,
};

const fontsHeader = {
    h1: {
        fontFamily: "Poppins",
        fontSize: sizesHeader.h1
    },
    h2: {
        fontFamily: "Poppins",
        fontSize: sizesHeader.h2
    },
    h3: {
        fontFamily: "Poppins",
        fontSize: sizesHeader.h3
    },
    title: {
        fontFamily: "Poppins",
        fontSize: sizesHeader.title
    },
    body: {
        fontSize: sizesHeader.body
    },
    caption: {
        fontSize: sizesHeader.caption
    },
    small: {
        fontSize: sizesHeader.small
    }
};

export { colors, sizes, fonts, colorsHeader, sizesHeader, fontsHeader };