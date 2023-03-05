import ReactCodeMirror from '@uiw/react-codemirror';
import React, { useEffect, useState } from 'react';
import * as styles from './styles.module.css';
import { sublime } from '@uiw/codemirror-theme-sublime';
import { staticCode } from '../TextGenerate/sampleCode';

var intervalID: any;
export default function TextGenerate() {
  const [code, setCode] = useState('// Click start to generate magic');
  const [start, setStart] = useState(false);

  const startGenerate = () => {
    let i = 0;
    let tempCode = '';

    intervalID = setInterval(() => {
      if (i === staticCode.length - 1) clearInterval(intervalID);
      tempCode = tempCode + staticCode[i];
      i++;
      setCode(tempCode);
    }, 10);
  };

  const handleGenerate = () => {
    setStart(true);
  };

  const handleReset = () => {
    setCode('// Click start to generate magic');
    setStart(false);
    clearInterval(intervalID);
  };

  useEffect(() => {
    if (start) {
      startGenerate();
    }

    return () => {
      clearInterval(intervalID);
    };
  }, [start]);

  const topContainer = () => {
    return (
      <div className={styles.buttonsContainer}>
        <button className={styles.button} onClick={handleGenerate}>
          Generating
        </button>
        <button className={styles.button} onClick={handleReset}>
          Reset
        </button>
      </div>
    );
  };

  const codeContainer = () => {
    return (
      <div className={styles.container}>
        <ReactCodeMirror
          value={code}
          height="300px"
          className={styles.codeMirror}
          theme={sublime}
        />
      </div>
    );
  };

  return (
    <div>
      {topContainer()}
      {codeContainer()}
    </div>
  );
}
