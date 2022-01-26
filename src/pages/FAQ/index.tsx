import { FC, useState } from 'react';
import { Layout } from 'components/Layout';

import AccordionDetails from '@mui/material/AccordionDetails';
import { Add, Remove } from '@mui/icons-material';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin } from 'hooks/appInsights';

import { DataQuestions } from './dataQuestions';

import * as Styled from './styles';

const FAQ: FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
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

          {DataQuestions.map(item => (
            <Styled.Accordion
              key={item.id}
              expanded={expanded === item.id}
              onChange={handleChange(item.id)}
            >
              <Styled.AccordionSummary
                expandIcon={
                  expanded === item.id ? <Remove color="primary" /> : <Add />
                }
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Styled.TitleQuestion changeColor={expanded === item.id}>
                  {item.title}
                </Styled.TitleQuestion>
              </Styled.AccordionSummary>
              <AccordionDetails>
                <Styled.QuestionAnswered>
                  {item.questionAnswered}
                </Styled.QuestionAnswered>
              </AccordionDetails>
            </Styled.Accordion>
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
