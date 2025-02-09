import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import ExchangeForm from '../components/ExchangeForm/ExchangeForm';
import { useSelector } from 'react-redux';
import {
  selectError,
  selectExchangeInfo,
  selectIsLoading,
} from '../redux/currency/selectors';
import ExchangeInfo from '../components/ExchangeInfo/ExchangeInfo';
import Loader from '../components/Loader/Loader';

const Home = () => {
  const exchangeInfo = useSelector(selectExchangeInfo);
  const isLoading = useSelector(selectIsLoading);
  const Error = useSelector(selectError);
  return (
    <Section>
      <Container>
        <Heading info title="What currencies do you want to exchange?🙂" />
        <ExchangeForm />
        {isLoading && <Loader />}

        {exchangeInfo && <ExchangeInfo />}
        {Error && <Heading error title={Error} />}
      </Container>
    </Section>
  );
};

export default Home;
