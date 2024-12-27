import React from 'react';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import useMain from './useMain';
import Loading from './components/loading/Loading';
import SingIn from './pages/signin/SingIn';
import Home from './pages/home/Home';
import Panel from './components/panel/Panel';
import Product from './pages/product/Product';
import AddCharacterModal from './modal/add_characters/AddCharacterModal';


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

          <Panel />

          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/products' element={<Product />}/>
          </Routes>
        </Router>

        <AddCharacterModal />
      </div>}
    </>
  );
};

export default App;