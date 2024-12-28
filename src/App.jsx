import React from 'react';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import useMain from './useMain';
import Loading from './components/loading/Loading';
import SingIn from './pages/signin/SingIn';
import Home from './pages/home/Home';
import Panel from './components/panel/Panel';
import Headers from './components/headers/Headers';
import Notice from './components/notice/Notice';


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

          <Headers />
          <Panel />

          <Routes>
            <Route path='/' element={<Home />}/>
          </Routes>
        </Router>
      </div>}

      <Notice.Init />
    </>
  );
};

export default App;