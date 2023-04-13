import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { notificationProvider, RefineSnackbarProvider } from "@refinedev/mui";

import { CssBaseline, GlobalStyles } from "@mui/material";
import routerBindings, {
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { ablyClient } from "utils";
import { liveProvider } from "@refinedev/ably";
import { MuiInferencer } from "@refinedev/inferencer/mui";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              liveProvider={liveProvider(ablyClient)}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                liveMode: "auto",
              }}
              resources={[
                {
                  name: "products",
                  list: "/products",
                  show: "/products/show/:id",
                  create: "/products/create",
                  edit: "/products/edit/:id",
                  meta: {
                    canDelete: true,
                  },
                },
              ]}
            >
              <Routes>
                <Route index element={<WelcomePage />} />
                <Route path="/products" element={<MuiInferencer />} />
                <Route path="/products/show/:id" element={<MuiInferencer />} />
                <Route path="/products/create" element={<MuiInferencer />} />
                <Route path="/products/edit/:id" element={<MuiInferencer />} />     
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
