import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {ChakraProvider} from "@chakra-ui/react";
import {ThemeProvider} from "next-themes";
import {ColorModeScript} from "@chakra-ui/color-mode";
import "./index.css";
import App from "./App.jsx";
import {theme, system} from "./theme.js";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {RecoilRoot} from "recoil";

createRoot(document.getElementById("root")).render(
    <RecoilRoot>
        <BrowserRouter>
            <ChakraProvider value={system}>
                <ThemeProvider attribute="class" disableTransitionOnChange>
                    <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
                    <App/>
                </ThemeProvider>
            </ChakraProvider>
        </BrowserRouter>
    </RecoilRoot>
);
