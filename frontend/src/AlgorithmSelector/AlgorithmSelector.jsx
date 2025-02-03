import { useState } from 'react';
import style from './AlgorithmSelector.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link  } from 'react-router-dom';

function AlgorithmSelector({category, selectedAlgorithm}) {

  const [isOpen, setIsOpen] = useState(true);
  const algorithms = ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Insertion Sort', 'Selection Sort', 'Heap Sort', 'Radix Sort', 'Counting Sort', 'Bucket Sort', 'Shell Sort', 'Cocktail Sort', 'Comb Sort', 'Pigeonhole Sort', 'Cycle Sort', 'Bitonic Sort', 'Pancake Sort', 'Binary Insertion Sort', 'Bogo Sort', 'Gnome Sort', 'Odd-Even Sort', 'Stooge Sort', 'Strand Sort', 'Bozo Sort', 'Slow Sort', 'Sleep Sort', 'Bead Sort', 'Pancake'];
  const buttonActive = isOpen ? style.buttonActive : '';

  const formatedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  
  const selectedAlgo = selectedAlgorithm ? selectedAlgorithm : '';
  

  return (
    <div className={style.outerContainer}>

    <div className={style.container}>
      <button 
        className={style.dropdownButton + ' ' + buttonActive}
        onClick={() => setIsOpen(!isOpen) }
      >
        {formatedCategory + " Algorithms"} 
        <FontAwesomeIcon 
            icon={isOpen ? faChevronDown : faChevronRight} 
            className={style.icon}
          />
      </button>
      
      {isOpen && (
        <div className={style.dropdown}>
          {algorithms.map((algorithm) => {

            const algorithmSlug = algorithm.toLowerCase().replace(/\s+/g, '-'); // Convert to URL-friendly format
            const path = `/${category}/${algorithmSlug}`;

            return (
            <Link to={path} style={{ textDecoration: 'none' }} key={algorithm}>
            <div
              className={style.option + (selectedAlgo === algorithmSlug ? ' ' + style.selectedAlgorithm : '')}
              
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