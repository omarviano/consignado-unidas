import { FC, useState } from 'react';
import { Layout } from 'components/Layout';
import { RouteAccess } from 'components/RouteAccess';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { ExpandMore, Add, Remove } from '@mui/icons-material';

import * as Styled from './styles';

const FAQ: FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <RouteAccess typesOfAccess="auth">
      <Layout
        containerStyles={{
          maxWidth: '1276px',
          padding: 0,
        }}
      >
        <Styled.Container>
          <div>
            <Accordion
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
              style={{
                marginBottom: '10px',
                border: ' 1px solid #C4C4C4',
                background: 'transparent',
                width: '1000px',
                marginLeft: '20px',
                filter: 'drop-shadow(0px 2px 6px rgba(46, 43, 80, 0.25))',
                boxShadow: 'none',
                borderRadius: '4px',
              }}
            >
              <AccordionSummary
                expandIcon={
                  expanded === 'panel1' ? <Remove color="secondary" /> : <Add />
                }
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  Personal data
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                  Integer sit amet egestas eros, vitae egestas augue. Duis vel
                  est augue.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === 'panel2'}
              onChange={handleChange('panel2')}
              style={{
                marginBottom: '10px',
              }}
            >
              <AccordionSummary
                expandIcon={
                  expanded === 'panel2' ? <Remove color="secondary" /> : <Add />
                }
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  Personal data
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                  Integer sit amet egestas eros, vitae egestas augue. Duis vel
                  est augue.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === 'panel3'}
              onChange={handleChange('panel3')}
              style={{
                marginBottom: '10px',
              }}
            >
              <AccordionSummary
                expandIcon={
                  expanded === 'panel3' ? <Remove color="secondary" /> : <Add />
                }
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  Personal data
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                  Integer sit amet egestas eros, vitae egestas augue. Duis vel
                  est augue.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </Styled.Container>
      </Layout>
    </RouteAccess>
  );
};

export { FAQ };
