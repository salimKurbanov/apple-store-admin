import React from 'react';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import useMain from './useMain';
import Loading from './components/loading/Loading';
import SingIn from './pages/signin/SingIn';
import Button from './components/button/Button';
import Api from './utils/Api';
import Home from './pages/home/Home';


const App = () => {

  const main = useMain()

  return (  
    <>
      {main.auth === 1 
      ?<Loading />
      :main.auth === 2 
      ?<SingIn />
      :<div className='main_wrapper'>
        <Router>
          <Routes>
            <Route path='/' element={<Home />}/>
          </Routes>
        </Router>
      </div>}
    </>
  );
};

export default App;