import 'animate.css';
import { Provider } from 'react-redux';
import { UIProvider } from '../context';
import { AppPropsWithLayout } from '../interfaces/app.interface';
import { store } from '../redux/store';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <UIProvider>
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </UIProvider>
  )
}

export default MyApp
