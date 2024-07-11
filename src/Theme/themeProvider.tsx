import { useEffect, useState, createContext, ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment-timezone";
import axios, { AxiosResponse } from "axios";

// antd
import { ConfigProvider, theme } from "antd";

// redux
import { selectSetting } from "../Redux/selectors";

// constants
import { lightTheme, darkTheme } from "../Utils/constants";

interface GetIPInfoApiResponse {
  datetime?: string;
  timezone?: string;
}

export interface ThemeContextProps {
  themeMode: string;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [sThemeMode, setThemeMode] = useState<string>("light");

  const dispatch = useDispatch();

  const setting = useSelector(selectSetting);

  useEffect(() => {
    if (setting.themeMode === "auto") {
      const darkThemeMq: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
      if (darkThemeMq.matches) {
        // Theme set to dark.
        setThemeMode('dark');
      } else {
        // Theme set to light.
        setThemeMode('light');
      }
    } else {
      setThemeMode(setting.themeMode);
    }
  }, [setting]);

  return (
    <ThemeContext.Provider value={{ themeMode: sThemeMode }}>
      <ConfigProvider
        theme={{
          algorithm:
            sThemeMode === "dark"
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
          token: sThemeMode === "dark" ? darkTheme : lightTheme,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
