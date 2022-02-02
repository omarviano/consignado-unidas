import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import {
  ThemeProvider as ThemeProviderMaterialUi,
  CssBaseline,
  StyledEngineProvider,
} from '@mui/material';
import { materialUiTheme } from 'styles/theme/material-ui';
import { CompleteNameForm } from 'pages/Registration/components/CompleteNameForm';

const Providers = ({ children }) => (
  <ThemeProviderMaterialUi theme={materialUiTheme}>
    <StyledEngineProvider injectFirst>
      <ThemeProviderStyledComponents theme={materialUiTheme}>
        <CssBaseline />
        {children}
      </ThemeProviderStyledComponents>
    </StyledEngineProvider>
  </ThemeProviderMaterialUi>
);

describe('Component: <CompleteNomeForm />', () => {
  test('should be able to render input', async () => {
    render(
      <Providers>
        <CompleteNameForm onSubmit={jest.fn} />
      </Providers>,
    );

    await waitFor(() => expect(screen.getByRole('textbox')).toBeDefined());
  });

  test('should be able to show required field', async () => {
    const { container } = render(
      <Providers>
        <CompleteNameForm onSubmit={jest.fn} />
      </Providers>,
    );

    const input = screen.getByRole('textbox');
    fireEvent.focusOut(input);

    await waitFor(() => {
      expect(container.querySelector('#error')?.firstChild).toBeDefined();
    });
  });

  test('should be able to not submit form', async () => {
    const onSubmit = jest.fn();

    render(
      <Providers>
        <CompleteNameForm onSubmit={onSubmit} />
      </Providers>,
    );

    const form = screen.getByTestId('completeName-form');
    fireEvent.submit(form);

    await waitFor(async () => {
      expect(onSubmit).not.toBeCalled();
    });
  });

  test('should be able to submit form data', async () => {
    const onSubmit = jest.fn();

    render(
      <Providers>
        <CompleteNameForm onSubmit={onSubmit} />
      </Providers>,
    );

    const form = screen.getByTestId('completeName-form');

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Fulano de tal' } });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(onSubmit).toBeCalled();
    });
  });
});
