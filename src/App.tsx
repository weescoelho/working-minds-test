import Routes from 'routes';
import { ThemeProvider } from 'styled-components';
import { ToastProvider } from 'react-toast-notifications';
import { DataContextProvider } from 'contexts/DataContext';
import light from 'styles/themes/light';
import GlobalStyle from './styles/global';

export function App(): JSX.Element {
  return (
    <ToastProvider placement="bottom-right">
      <ThemeProvider theme={light}>
        <DataContextProvider>
          <GlobalStyle />
          <Routes />
        </DataContextProvider>
      </ThemeProvider>
    </ToastProvider>
  );
}
