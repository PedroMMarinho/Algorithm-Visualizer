import { useState } from 'react';
import style from './AlgorithmSelector.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link,useLocation  } from 'react-router-dom';

function AlgorithmSelector() {

  const [isOpen, setIsOpen] = useState(true);
  const algorithms = ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Insertion Sort', 'Selection Sort', 'Heap Sort', 'Radix Sort', 'Counting Sort', 'Bucket Sort', 'Shell Sort', 'Cocktail Sort', 'Comb Sort', 'Pigeonhole Sort', 'Cycle Sort', 'Bitonic Sort', 'Pancake Sort', 'Binary Insertion Sort', 'Bogo Sort', 'Gnome Sort', 'Odd-Even Sort', 'Stooge Sort', 'Strand Sort', 'Bozo Sort', 'Slow Sort', 'Sleep Sort', 'Bead Sort', 'Pancake'];
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');

  const handleSelect = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  const buttonActive = isOpen ? style.buttonActive : '';

  return (
    <div className={style.outerContainer}>

    <div className={style.container}>
      <button 
        className={style.dropdownButton + ' ' + buttonActive}
        onClick={() => setIsOpen(!isOpen) }
      >
        Sorting Algorithms
        <FontAwesomeIcon 
            icon={isOpen ? faChevronDown : faChevronRight} 
            className={style.icon}
          />
      </button>
      
      {isOpen && (
        <div className={style.dropdown}>
          {algorithms.map((algorithm) => {

            const algorithmSlug = algorithm.toLowerCase().replace(/\s+/g, '-'); // Convert to URL-friendly format
            const path = `${useLocation().pathname}/${algorithmSlug}`;

            return (
            <Link to={path} style={{ textDecoration: 'none' }} key={algorithm}>
            <div
              className={style.option + (selectedAlgorithm === algorithm ? ' ' + style.selectedAlgorithm : '')}
              onClick={() => handleSelect(algorithm)}
            >
              {algorithm}
            </div>
            </Link>
            );})}
        </div>
      )}
    </div>
    </div>
  );
}

export default AlgorithmSelector;