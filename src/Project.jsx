import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

const Project = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default Project;