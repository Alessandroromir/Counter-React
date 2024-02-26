/** @format */

import React from 'react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './redux/createStore';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// Componenti class-based (contro= props drilling)

/*function Counter (){

  const [count, setCount] = useState(0);

  function Increment (){
    setCount(count + 1)
  }

  function () {
    setCounter(count-1)
  }

  return (
    <div>
      <button onClick={Increment}>
        +
      </button>

      <button onClick={Decrement}>
        -
        </button>


    </div>
  )


}

function Increment ()*/


//component con lo useContext

const CounterContext = createContext({
  count: 0,
  increment: () => {}, // Funzione vuota iniziale per evitare errori
});


function CounterProvider({ children }) {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  const value = { count, increment, decrement }; // Fornisce tutte le funzioni relative al contatore

  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  );
}

function CounterButton({ type }) {
  const { count, increment, decrement } = useContext(CounterContext);

  return (
    <button onClick={() => (type === 'increment' ? increment() : decrement())}>
      {type === 'increment' ? '+' : '-'}
    </button>
  );
}

function App() {
  return (
    <CounterProvider>
      <div>
        <CounterButton type="increment" />
        <span>{count}</span>
        <CounterButton type="decrement" />
      </div>
    </CounterProvider>
  );
}

export default App;


