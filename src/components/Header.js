import { useEffect, useState } from "react";
import { ReactComponent as Sun } from "./icon/Sun.svg";
import { ReactComponent as Moon } from "./icon/Moon.svg";

function Header() {
  const [switchTheme, setSwitchThemes] = useState(function () {
    const stored = localStorage.getItem("themes");
    return stored ? JSON.parse(stored) : false;
  });

  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-themes", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-themes", "light");
  };

  function handleToogle(e) {
    setSwitchThemes(e.target.checked);
  }

  useEffect(
    function () {
      localStorage.setItem("themes", switchTheme);

      if (switchTheme) {
        setDarkMode();
      } else {
        setLightMode();
      }
    },
    [switchTheme]
  );

  return (
    <header className="header row rounded-block">
      <h1 className="header__logo">Quizzo</h1>
      <div className="theme__switch">
        <input
          type="checkbox"
          id="darkmode-toggle"
          onChange={handleToogle}
          checked={switchTheme}
        />
        <label className="switch-toggle-icon" htmlFor="darkmode-toggle">
          <Sun />
          <Moon />
        </label>
      </div>
    </header>
  );
}

export default Header;
