import Navbar from './components/Navbar';
import Home from './pages/Home';
import Loader from './components/Loader';
import Alert from './components/Alert';
import ErrorAlert from './components/ErrorAlert';

function App() {
  return (
    <div>
      <ErrorAlert />
      <Alert />
      <Navbar />
      <Loader />
      <Home />
    </div>
  );
}

export default App;
