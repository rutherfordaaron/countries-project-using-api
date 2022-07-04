import { useState, useEffect } from 'react';
import sunIcon from './icons/sun-solid.svg';
import moonIcon from './icons/moon-solid.svg';
import './index.css';

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  useEffect(() => localStorage.setItem('theme', theme));

  const themeSwitch = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.body.setAttribute('data-theme', 'dark');
    } else {
      setTheme('light');
      document.body.setAttribute('data-theme', 'light');
    }
  }



  return (
    <div className='app'>
      <header>
        <h1>Where in the world?</h1>
        <button className='themeSwitch' type='button' onClick={themeSwitch}><img id='themeIcon' src={theme === 'dark' ? moonIcon : sunIcon} />{theme} mode</button>
      </header>
      <main>

      </main>
      <footer>

      </footer>
    </div>
  )
}

export default App;
