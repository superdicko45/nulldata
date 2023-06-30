import { BrowserRouter, Routes, Route } from 'react-router-dom';

//importar nuestros componentes
import ListEmpleados from './components/ListEmpleados';
import CreateEmpleado from './components/CreateEmpleado';
import ShowEmpleado from './components/ShowEmpleado';

function App() {
  return (
    <div className="App">
      <div className='container mt-4'>  
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <ListEmpleados/> } />
            <Route path='/create' element={ <CreateEmpleado/> } />
            <Route path='/show/:id' element={ <ShowEmpleado/> } />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;