import '../styles/global.css';
import { store } from '../app/store';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Provider store={store}><Component {...pageProps} /></Provider>
}
