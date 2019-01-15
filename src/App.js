import React from 'react';
import FormContainer from './containers/FormContainer';
import AccountSection from './containers/AccountSection';
import Field from './components/Field';
import styled, { createGlobalStyle } from 'styled-components';
import AlverataBlack from './assets/fonts/Alverata-Black.otf';
import validation from './validation';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: AlverataBlack;
    src: url(${AlverataBlack});
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
  }

  @font-face {
    font-family: SanFrancisco;
    src: url('https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscodisplay-regular-webfont.woff');
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
  }

  body {
    font-family: SanFrancisco, sans-serif;
  }
`;

const StyledApp = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 3rem 4rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const App = () => (
  <StyledApp>
    <GlobalStyles />
    {/* Reusable form container and field components */}
    <FormContainer name="send_money" title="Send money" buttonValue="Send">
      <Field name="name" label="Name" type="text" validate={validation} />
      <Field name="email" label="Email address" type="email" validate={validation} />
      <Field name="amount" label="Amount" type="number" showCurrencySymbol validate={validation} />
    </FormContainer>
    <AccountSection />
  </StyledApp>
);

export default App;
