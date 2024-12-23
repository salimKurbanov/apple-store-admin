import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import useMain from './useMain';
import Loading from './components/loading/Loading';
import SingIn from './pages/signin/SingIn';
import Button from './components/button/Button';
import Api from './utils/Api';


const App = () => {

  const main = useMain()

  return (  
    <>
      {main.auth === 1 
      ?<Loading />
      :main.auth === 2 
      ?<SingIn />
      :<>Основная часть <Button callback={() => Api.logout()}>Выходи</Button></>}
    </>
  );
};

export default App;