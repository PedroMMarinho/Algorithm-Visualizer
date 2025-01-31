import { useState, useEffect } from 'react';
import AlgorithmRunner from '../AlgorithmRunner/AlgorithmRunner';
import CodeSettings from '../CodeSettings/CodeSettings';

function About() {

  return (
    <>
      <CodeSettings/>
      <div>
        <AlgorithmRunner/>
      </div>
    </>
  );
}

export default About;