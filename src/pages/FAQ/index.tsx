import { FC, useState } from 'react';
import { Layout } from 'components/Layout';
/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';

import { Add, Remove } from '@mui/icons-material';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin } from 'hooks/appInsights';

import { Formik } from 'components/Formik';
import { Input } from 'components/Inputs/Input';
import { Button } from 'components/Buttons/Button';
import { DataQuestions, DataQuestionsProps } from './dataQuestions';

import * as Styled from './styles';

const FAQ: FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [dataQuestionFiltered, setDataQuestionFiltered] =
    useState(DataQuestions);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleSubmit = ({ search }) => {
    if (search === '') {
      setDataQuestionFiltered(DataQuestions);
      return;
    }

    const filtered = DataQuestions.map(item => ({
      ...item,
      items: item.items.filter(
        child =>
          child.title.includes(search.toLowerCase()) ||
          child.questionAnswered.includes(search.toLowerCase()),
      ),
    })).filter(item => item.items.length > 0);

    setDataQuestionFiltered(filtered);
  };

  return (
    <Layout
      containerStyles={{
        maxWidth: '1276px',
      }}
    >
      <Styled.Container>
        <Styled.Header>
          <Styled.FAQ>faq</Styled.FAQ>
        </Styled.Header>

        <Styled.Content>
          <Styled.CommonQuestions>Perguntas Frequentes</Styled.CommonQuestions>

          <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
            <Input name="search" placeholder="Pesquisar" label="" />
            <Button type="submit" variant="contained">
              Buscar
            </Button>
          </Formik>

          {dataQuestionFiltered.length === 0 && (
            <Styled.NoResults>Nenhum resultado encontrado</Styled.NoResults>
          )}

          {dataQuestionFiltered.map(group => (
            <Styled.Group>
              <Styled.GroupTitle>{group.title}</Styled.GroupTitle>

              {group.items.map(item => (
                <Styled.Accordion
                  key={item.id}
                  expanded={expanded === item.id}
                  onChange={handleChange(item.id)}
                >
                  <Styled.AccordionSummary
                    expandIcon={
                      expanded === item.id ? (
                        <Remove color="primary" />
                      ) : (
                        <Add />
                      )
                    }
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                  >
                    <Styled.TitleQuestion changeColor={expanded === item.id}>
                      {item.title}
                    </Styled.TitleQuestion>
                  </Styled.AccordionSummary>

                  <Styled.AccordionDetails>
                    <Styled.QuestionAnswered>
                      {item.questionAnswered}
                    </Styled.QuestionAnswered>
                  </Styled.AccordionDetails>
                </Styled.Accordion>
              ))}
            </Styled.Group>
          ))}
          <Styled.HaveQuestions>
            Ainda possui dúvidas? Entrem em contato com a gente! <br />
            <Styled.Email>consignado@unidas.com.br</Styled.Email>
          </Styled.HaveQuestions>
        </Styled.Content>
      </Styled.Container>
    </Layout>
  );
};

export default withAITracking(reactPlugin, FAQ, 'FAQ');
