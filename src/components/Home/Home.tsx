import { useAppContext } from '../../contexts/AppContext';
import useInterval from '../../hooks/useInterval';

import LOGO from '../../assets/logo.svg';

interface Props {
  message: string;
}

const Home = ({}: Props) => {
  const { appMessages } = useAppContext();

  useInterval(() => {
    console.log('interval log');
  }, 5000);

  return (
    <>
      <img src={LOGO} alt="xReact Logo" width="300" height="200" />
      <h1>My React App with TypeScript and Webpack 5</h1>
      <h2>{appMessages.message}</h2>
    </>
  );
};

export default Home;
