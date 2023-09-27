import React from 'react';

const Header = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  }

  return (
    <header>
      <a href="/" className="brand-name">
        <h1>Bookstore</h1>
      </a>

      <div className="profile">
        <div className="dark-mode-toggle">
          <button
            type="button"
            className={`toggle-switch ${darkMode ? 'on' : 'off'}`}
            onClick={() => toggleDarkMode()}
          >
            <div className="slider" />
          </button>
          <span>
            {`${darkMode ? 'Light' : 'Dark'} `}
            Mode
          </span>
        </div>
        <span className="material-symbols-outlined">account_circle</span>
        <span>Leo Tran</span>
      </div>
    </header>
  );
};

export default Header;
