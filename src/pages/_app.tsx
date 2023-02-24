import 'animate.css';
import { Provider } from 'react-redux';
import { UIProvider } from '../context';
import { AppPropsWithLayout } from '../interfaces/app.interface';
import { store, persistor } from '../redux-toolkit/store';
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <UIProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {getLayout(<Component {...pageProps} />)}
        </PersistGate>
      </Provider>
    </UIProvider >
  )
}

export default MyApp
