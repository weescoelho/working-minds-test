import Routes from 'routes';
import { ToastProvider } from 'react-toast-notifications';
import { DataContextProvider } from 'contexts/DataContext';
import GlobalStyle from './styles/global';

export function App(): JSX.Element {
  return (
    <ToastProvider placement="bottom-right">
      <DataContextProvider>
        <GlobalStyle />
        <Routes />
      </DataContextProvider>
    </ToastProvider>
  );
}
