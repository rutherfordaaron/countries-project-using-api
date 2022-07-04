import { useState, useEffect } from 'react';

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  useEffect(() => localStorage.setItem('theme', theme));

  return (
    <div className='app' data-theme={theme}>
      <header>
        <h1>Where in the world?</h1>
        <div className='themeSwitch'>

        </div>
      </header>
      <main>

      </main>
      <footer>

      </footer>
    </div>
  )
}

export default App;
