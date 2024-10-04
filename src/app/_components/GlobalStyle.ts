"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    color: rgb(33, 25, 34);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
    -webkit-font-smoothing: antialiased;

    main {
      padding: 16px;
    }

    * {
      box-sizing: border-box;
    }
  }
`;

export default GlobalStyle;
