import { useEffect } from "react";
import Nav from "./Components/Nav";
import Hero from "./Components/Hero";
import { useTheme } from "./Context/ThemeContext";
import initSwirl from "./Components/swirl";

function App() {
  const { isDark, setIsDark } = useTheme();

  useEffect(() => {
    initSwirl({isDark});
  }, [isDark]);

  return (
    <>
      <Nav isDark={isDark} setIsDark={setIsDark} />
      <Hero />
    </>
  );
}

export default App;
