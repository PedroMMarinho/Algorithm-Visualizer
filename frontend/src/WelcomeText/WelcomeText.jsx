import styles from './WelcomeText.module.css';


function WelcomeText() {
  return (
    <div className={styles.welcomeText}>
      <h1>Welcome to AlgoVisualizer</h1>
      <p className= {styles.text}>
        Using an intuitive UI to visualize a myriad of algorithms, this program is able to help any student/engineer understand the concept and the process behind certain algorithms. 
        Currently supports graph problems, array problems, and sorting algorithms. <strong> More features will be added in the future. </strong>
      </p>
    </div>
  );
}

export default WelcomeText;