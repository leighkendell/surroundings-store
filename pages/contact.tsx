import React from 'react';
import { HeaderText, Layout, Section, Text, Wrapper } from '../components';

const ContactPage: React.FunctionComponent = () => {
  return (
    <Layout pageTitle="Contact">
      <HeaderText>Contact</HeaderText>
      <Section>
        <Wrapper collapseTop={true}>
          <Text>
            For enquiries about orders please email{' '}
            <a href="mailto:contact@surroundings.band">
              contact@surroundings.band
            </a>
            .
          </Text>
        </Wrapper>
      </Section>
    </Layout>
  );
};

export default ContactPage;
