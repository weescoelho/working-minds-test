import Routes from 'routes';
import { ThemeProvider } from 'styled-components';
import { ToastProvider } from 'react-toast-notifications';
import light from 'styles/themes/light';
import GlobalStyle from './styles/global';

export function App(): JSX.Element {
  return (
    <ThemeProvider theme={light}>
      <ToastProvider placement="bottom-right">
        <GlobalStyle />
        <Routes />
      </ToastProvider>
    </ThemeProvider>
  );
}
