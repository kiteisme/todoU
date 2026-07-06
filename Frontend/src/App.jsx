import { Toaster } from 'sonner';
import { BrowserRouter, Routes, Route } from 'react-router';
import Homepage from './pages/HomePage';
import Notfound from './pages/NotFound';

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;