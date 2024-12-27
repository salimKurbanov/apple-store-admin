import React from 'react';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import useMain from './useMain';
import Loading from './components/loading/Loading';
import SingIn from './pages/signin/SingIn';
import Home from './pages/home/Home';
import Panel from './components/panel/Panel';
import Headers from './components/headers/Headers';


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

          <Headers course={main.course}/>
          <Panel />

          <Routes>
            <Route path='/' element={<Home course={main.course}/>}/>
          </Routes>
        </Router>
      </div>}
    </>
  );
};

export default App;