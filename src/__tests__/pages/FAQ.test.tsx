import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import {
  ThemeProvider as ThemeProviderMaterialUi,
  StyledEngineProvider,
} from '@mui/material';
import { materialUiTheme } from 'styles/theme/material-ui';

import { AppProvider } from 'hooks';

import FAQ from 'pages/FAQ';

jest.mock('pages/FAQ/dataQuestions', () => ({
  __esModule: true,
  DataQuestions: [
    {
      id: 'group1',
      title: 'Nome do grupo 1',
      items: [
        {
          id: 'question1',
          title: 'Title 1',
          questionAnswered: 'Resposta 1',
        },
        {
          id: 'question2',
          title:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque minus sapiente saepe assumenda ipsa error dolores incidunt aliquid id adipisci, voluptatum blanditiis? Ut, voluptates accusantium? Quibusdam numquam hic ducimus quam.',
          questionAnswered:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque minus sapiente saepe assumenda ipsa error dolores incidunt aliquid id adipisci, voluptatum blanditiis? Ut, voluptates accusantium? Quibusdam numquam hic ducimus quam.',
        },
      ],
    },
    {
      id: 'group2',
      title: 'Nome do grupo 2',
      items: [
        {
          id: 'question3',
          title:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque minus sapiente saepe assumenda ipsa error dolores incidunt aliquid id adipisci, voluptatum blanditiis? Ut, voluptates accusantium? Quibusdam numquam hic ducimus quam.',
          questionAnswered:
            'Em caso de dúvidas ou problemas, você pode nos contatar pelo e-mail consignado@unidas.com.br.',
        },
        {
          id: 'question4',
          title:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque minus sapiente saepe assumenda ipsa error dolores incidunt aliquid id adipisci, voluptatum blanditiis? Ut, voluptates accusantium? Quibusdam numquam hic ducimus quam.',
          questionAnswered:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque minus sapiente saepe assumenda ipsa error dolores incidunt aliquid id adipisci, voluptatum blanditiis? Ut, voluptates accusantium? Quibusdam numquam hic ducimus quam.',
        },
      ],
    },
  ],
}));

const Providers = ({ children }) => (
  <ThemeProviderMaterialUi theme={materialUiTheme}>
    <StyledEngineProvider injectFirst>
      <ThemeProviderStyledComponents theme={materialUiTheme}>
        <AppProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </AppProvider>
      </ThemeProviderStyledComponents>
    </StyledEngineProvider>
  </ThemeProviderMaterialUi>
);

describe('Page: <Contracts />', () => {
  test('should be able to render questions', async () => {
    render(
      <Providers>
        <FAQ />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getAllByTestId('groupTitle').length).toBe(2);
      expect(screen.getAllByTestId('groupTitle')[0].textContent).toBe(
        'Nome do grupo 1',
      );
      expect(screen.getAllByTestId('groupTitle')[1].textContent).toBe(
        'Nome do grupo 2',
      );
      expect(screen.getAllByTestId('questionAnswered').length).toBe(4);
      expect(screen.getAllByTestId('questionAnswered')[0].textContent).toBe(
        'Resposta 1',
      );
    });
  });

  test('should be able to filter questions', async () => {
    render(
      <Providers>
        <FAQ />
      </Providers>,
    );

    const searchInput = screen.getByTestId('searchInput');
    fireEvent.change(searchInput, { target: { value: 'Title 1' } });

    fireEvent.click(screen.getByTestId('searchButton'));

    await new Promise(r => setTimeout(r, 1000));

    await waitFor(() => {
      expect(screen.getAllByTestId('groupTitle').length).toBe(1);
      expect(screen.getByTestId('titleQuestion').textContent).toBe('Title 1');
      expect(screen.getByTestId('questionAnswered').textContent).toBe(
        'Resposta 1',
      );
    });
  }, 5000);

  test('should be able to render no results message', async () => {
    render(
      <Providers>
        <FAQ />
      </Providers>,
    );

    const searchInput = screen.getByTestId('searchInput');
    fireEvent.change(searchInput, { target: { value: 'asdf' } });

    fireEvent.click(screen.getByTestId('searchButton'));

    await new Promise(r => setTimeout(r, 1000));

    await waitFor(() => {
      expect(screen.getByTestId('noResults')).toBeDefined();
    });
  }, 5000);
});
