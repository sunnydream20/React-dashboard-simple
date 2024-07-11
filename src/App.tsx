import { useCallback, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createGlobalStyle } from "styled-components";
import axios from "axios";

// antd
import { theme } from "antd";

// hooks
import usePreventZoomOnFocus from "./Utils/Hooks/usePreventZoomOnFocus";

// redux
import { updateSettingField } from "./Redux/settingSlice";
import { updateProfile } from "./Redux/profileSlice";

// routes
import AppRoutes from "./AppRoutes";

// styles
import "./App.css";
import "react-international-phone/style.css";
import { API } from "./Utils/api";

const { useToken } = theme;

const GlobalStyle = createGlobalStyle`
  ${({ theme }) => `
    body {
      --color-bg-layout: ${theme.colorBgLayout};
      --color-bg-container: ${theme.colorBgContainer};
      --color-bg-list-item-actived: ${theme.colorBgListItemActived};
      --color-border-primary: ${theme.colorBorderPrimary};
      --border-radius-input: ${theme.borderRadiusInput};
      --border-radius-button: ${theme.borderRadiusButton};
      --border-radius-container: ${theme.borderRadiusContainer};
      --padding-content: ${theme.paddingContent};
      --padding-container: ${theme.paddingContainer};
      --color-text: ${theme.colorText};
      --font-size-page-title: ${theme.fontSizePageTitle};
      --font-weight-page-title: ${theme.fontWeightPageTitle};
      --margin-bottom-page-title: ${theme.marginBottomPageTitle};
      --transition-time-when-switch-theme-mode: ${theme.transitionTimeWhenSwitchThemeMode};
      --background-affix-hover: ${theme.backgroundAffixHover};
    }
    input, select, textarea {
      // font-size: 16px !important;
    }`}
`;

function App() {
  const dispatch = useDispatch();

  const { token } = useToken();
  usePreventZoomOnFocus();

  const checkUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get("/auth/check", {
        headers: {
          token,
        },
      });

      const { data } = response;

      dispatch(updateProfile({ data }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error during check user:", error.response?.data);
      } else {
        console.error("Error during check user:", error);
      }
    }
  }, []);

  const themeColors = {
    light: {
      backgroundAffixHover: 'rgba(10, 10, 10, 0.03)', // Light mode color
    },
    dark: {
      backgroundAffixHover: '#222222', // Dark mode color
    }
  };

  const themeMode = localStorage.getItem("themeMode") || "light";

  const currentTheme = themeMode === "dark" ? themeColors.dark : themeColors.light;

  useEffect(() => {
    // set theme mode
    const themeMode = localStorage.getItem("themeMode");
    dispatch(
      updateSettingField({
        field: "themeMode",
        value: themeMode ? themeMode : "light",
      })
    );

    // check user with token stored in local storage
    checkUser();
  }, []);

  return (
    <Router>
      <GlobalStyle
        theme={{
          colorBgLayout: token.colorBgLayout,
          colorBgContainer: token.colorBgContainer,
          colorBgListItemActived: token.colorBgListItemActived,
          colorText: token.colorText,
          colorBorderPrimary: token.colorBorderPrimary,
          borderRadiusInput: "12px",
          borderRadiusButton: "12px",
          borderRadiusContainer: "18px",
          paddingContent: "25px",
          paddingContainer: "24px",
          fontSizePageTitle: "20px",
          fontWeightPageTitle: "600",
          marginBottomPageTitle: "20px",
          transitionTimeWhenSwitchThemeMode: "0.5s",
          backgroundAffixHover: currentTheme.backgroundAffixHover,
        }}
      />
      <AppRoutes />
    </Router>
  );
}

export default App;
