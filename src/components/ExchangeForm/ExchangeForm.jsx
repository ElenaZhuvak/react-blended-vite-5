import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';
import { getExchangeInfo } from '../../redux/currency/operations';
import { useDispatch } from 'react-redux';

const pattern = /^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$/;

const ExchangeForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    const inputValue = e.target.elements.currency.value;
    const isValid = pattern.test(inputValue);
    if (!isValid) {
      console.log('Is not valid value');

      return;
    }
    const [amount, from, , to] = inputValue.split(' ');
    const dataObj = {
      to,
      from,
      amount,
    };
    dispatch(getExchangeInfo(dataObj));
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        title="Request format 15 USD in UAH"
        className={styles.input}
        name="currency"
      />
    </form>
  );
};

export default ExchangeForm;
