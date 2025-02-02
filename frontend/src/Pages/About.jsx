import { useState, useEffect } from 'react';
import AlgorithmRunner from '../AlgorithmRunner/AlgorithmRunner';
import CodeSettings from '../CodeSettings/CodeSettings';
import Header from '../Header/Header';

function About() {
  const style = {
    height: "89vh",
  };
  return (
    <><Header />
      <div style={style}>
  
        <AlgorithmRunner/>
      </div>
    </>
  );
}

export default About;