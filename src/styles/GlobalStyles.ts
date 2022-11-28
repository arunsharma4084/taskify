import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    /*
    1. Use a more-intuitive box-sizing model.
    */
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    /*
        2. Remove default margin
    */
    * {
        margin: 0;
    }

    /*
        3. Allow percentage-based heights in the application
    */
    html,
    body {
        height: 100%;
    }

    /*
        Typographic tweaks!
        4. Add accessible line-height
        5. Improve text rendering
    */
    body {
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
    }

    /*
        6. Improve media defaults
    */
    img,
    picture,
    video,
    canvas,
    svg {
        display: block;
        max-width: 100%;
    }

    /*
        7. Remove built-in form typography styles
    */
    input,
    button,
    textarea,
    select {
        font: inherit;
    }

    /*
        8. Avoid text overflows
    */
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        overflow-wrap: break-word;
        hyphens: auto;
    }

    /*
        9. Create a root stacking context
    */
    #root,
    #__next {
        isolation: isolate;
    }

    :root {
        --color-primary: hsl(173, 92%, 44%);
        --color-primary-light: hsl(173, 100%, 97%);
        --color-accent: hsl(248, 60%, 33%);
        --color-secondary: hsl(35, 85%, 86%);
        --color-secondary-light: hsl(35, 85%, 96%);
        --color-incomplete: hsl(1, 100%, 70%);
        --color-gray-50: hsl(210deg, 19%, 10%);
        --color-gray-100: hsl(210deg, 15%, 20%);
        --color-gray-200: hsl(210deg, 15%, 25%);
        --color-gray-300: hsl(210deg, 10%, 40%);
        --color-gray-400: hsl(210deg, 9%, 45%);
        --color-gray-500: hsl(210deg, 8%, 50%);
        --color-gray-600: hsl(210deg, 12%, 55%);
        --color-gray-700: hsl(210deg, 14%, 66%);
        --color-gray-800: hsl(210deg, 20%, 77%);
        --color-gray-900: hsl(210deg, 25%, 88%);
        --color-gray-1000: hsl(210deg, 25%, 96%);
    }

    html {
        --font-sans-serif: 'Asap', -apple-system, BlinkMacSystemFont,  'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', Arial, Helvetica, Verdana, Tahoma, sans-serif;
        --font-serif: Georgia, 'Times New Roman', Times, serif;
        --font-monospace: 'Courier New', Courier, monospace;
    }
`;

export default GlobalStyles;