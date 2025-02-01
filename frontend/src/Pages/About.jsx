import { useState, useEffect } from 'react';
import AlgorithmRunner from '../AlgorithmRunner/AlgorithmRunner';
import CodeSettings from '../CodeSettings/CodeSettings';

function About() {
  const style = {
    height: "89vh",
  };
  return (
    <>
      <div style={style}>
      <CodeSettings/>
        <AlgorithmRunner/>
      </div>
    </>
  );
}

export default About;