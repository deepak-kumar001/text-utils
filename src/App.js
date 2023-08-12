// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import TextForm from './Components/TextForm';
import Alert from './Components/Alert';

let timer;
function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    clearTimeout(timer);
    timer = setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  const [mode, setmode] = useState('light');
  const toggleMode = () => {
    if (mode === 'light') {
      setmode('dark');
      document.body.style.backgroundColor = '#1a164e';
      document.body.style.color = 'white';
      showAlert("Dark mode Enabled", "success");
      // document.title = "TextUtils - Home";
    }
    else {
      setmode('light');
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
      showAlert("Light mode Enabled", "success");
    }
  }
  return (
    <>
      <Navbar title="TextUtils" aboutText="About" mode={mode} toggleMode={toggleMode}></Navbar>
      <Alert alert={alert} />
      <div className="container">
        <TextForm heading="Enter the Text below to Analyze" mode={mode} showAlert={showAlert}></TextForm>
      </div>
    </>
  );
}

export default App;
