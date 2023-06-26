import { evaluate } from 'mathjs';
import React, { useState } from 'react';
import './App.css';
import Button from './components/button';
import Display from './components/display';


const values = [
  {
    id:'seven',
    value: '7',
    key: '7'
  },
  {
    id:'eight',
    value: '8',
    key: '8'
  },
  {
    id:'nine',
    value: '9',
    key: '9'
  },
  {
    id:'multiply',
    value: '*',
    key: '*'
  },
  {
    id:'four',
    value: '4',
    key: '4'
  },
  {
    id:'five',
    value: '5',
    key: '5'
  },
  {
    id:'six',
    value: '6',
    key: '6'
  },
  {
    id:'divide',
    value: '/',
    key: '/'
  },
  {
    id:'one',
    value: '1',
    key: '1'
  },
  {
    id:'two',
    value: '2',
    key: '2'
  },
  {
    id:'three',
    value: '3',
    key: '3'
  },
  {
    id:'decimal',
    value: '.',
    key: '.'
  },
  {
    id:'zero',
    value: '0',
    key: '0'
  },
  {
    id:'add',
    value: '+',
    key: '+'
  },
  {
    id:'subtract',
    value: '-',
    key: '-'
  },
  {
    id:'equals',
    value: '=',
    key: '='
  }
];;

function App() {

  const [input, setInput] = useState('0');
  const [output, setOutput] = useState('');
  const [evaluation, setEvaluation] = useState(false);



//validation
  function removezerosdecimal(str) {
    const regex = /(?<=\D)0+\./g;
    let result = str.replace(regex, '0.');
    return result;
  };

  function removezerostart(str) {
    const regex = /^0+(?=\d+)/g;
    let result = str.replace(regex, '');
    return result;
  };

  function removeotherzero(str) {
  const regex = /(?<=[-+*/])0+/g;
  let result = str.replace(regex, '0');
    return result;
  };

  function removedecimals(str) {
  let regex = /(?<=\d+\.\d*)\./g;
  let result = str.replace(regex, '');
  return result;
  };
  function removedecimalinoperator(str) {
  let regex = /(?<=[-+*/])\.|\.(?=[-+*/])/g;
  let result = str.replace(regex, '');
  return result;
  };

  function removeoperators(str) {
  let regex1 = /[-+*/]+(?=[+*/])/g;
  let result1 = str.replace(regex1, '');
  let regex2 = /--/g;
  let result2 = result1.replace(regex2, '-');
  return result2;
  };


  function validateInput(str) {
    let zerostart = removezerostart(str);
    let zerodecimal = removezerosdecimal(zerostart);
    let otherzeros = removeotherzero(zerodecimal);
    let doubledecimal = removedecimals(otherzeros);
    let decimalinoperator = removedecimalinoperator(doubledecimal);
    let result = removeoperators(decimalinoperator);
    return result;
  };
  React.useEffect(() => {
    setInput(validateInput(input));
  },[input])


  function displaylast(val) {
    let arr = val.split('');
    let lastdigits = arr.slice(-15).join('');
    return lastdigits;
  };


  function removelastoperators(str) {
    let regex = /\D+$/;
    let result = str.replace(regex, '');
    return result;
  };

  function decimalSet(val) {
    let parsed = Number.parseFloat(val);
    let setdecimal = parsed.toFixed(4);
    let result = setdecimal.toString();
    return result;
  };

  function removeZerodecimal(str) {
    let pattern = /(\.0+$)|((?<=\.\d+)0+$)/;
    let result = str.replace(pattern, '');
    return result;
  };
  function evaluateInput(str) {
    let nolastOperator = removelastoperators(str)
    let value = evaluate(nolastOperator);
    let roundnumber = decimalSet(value);
    let result = removeZerodecimal(roundnumber)
    return result;
  };


//Handle input
  const addInput = val => {
  let regex1 = /[-+*/]/;
  let regex2 = /\d|./;
    if (val === '=') {
      setInput(evaluateInput(input));
      setOutput(evaluateInput(input));
      setEvaluation(true);
    } else if (regex1.test(val)) {
      setInput(input+val);
      setOutput(evaluateInput(input));
    } else if (regex2.test(val) && !evaluation) {
      setInput(input + val);
      setOutput(evaluateInput(input));
    } else if (regex2.test(val) && evaluation) {
      setInput(val);
      setOutput(evaluateInput(input));
      setEvaluation(false);
    }
  };
  React.useEffect(() => {
    setOutput(evaluateInput(input));
  },[input]);
  


//Clear the input
  const handleClear =() => {
    setInput('0');
  };
//Delete last input
  function deleteinput(input) {
    if(input.length >1) {
      let result = input.slice(0,-1);
      setInput(result);
    }
  };

  return (
    <div className='wrapper container-fluid'>
      <div className='=container'>
        <div className='row screen'>
          <Display  id='screen' input={input} output={output} />
        </div>
        <div className='row deleteButtons p-1'>
          <button className='col-6 delButton' id='clear' onClick={handleClear}>AC</button>
          <button className='col-6 delButton' id='del' onClick={()=>deleteinput(input)}>C</button>
        </div>
        <div className='row buttons-container'>
          {values.map((val) => <Button key={val.key} id={val.id} handleClick={addInput}>{val.value}</Button> )}
        </div>
        <div className='row buttons-disabled p-1'>
          <button className='col-6 disabledButton' aria-disabled="true">-</button>
          <button className='col-6 disabledButton' aria-disabled="true">-</button>
        </div>
      </div>
    </div>
  );
};

export default App;
