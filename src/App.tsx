/** @format */

import * as React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from './components/Container';

const App:React.FC = () => {
  const handleOnConfimSelection = (selection: any) => {
    console.log('Selection confirmed:', selection);
  }

  return (
    <div>
      <Container onConfirmSelection={handleOnConfimSelection} />
    </div>
  );
};

export default App;