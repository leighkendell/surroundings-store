import React from 'react';
import { HeaderText, Layout, Section, Text, Wrapper } from '../components';

interface Props {
  statusCode: number;
}

class Error extends React.Component<Props> {
  public static getInitialProps({ res }) {
    const statusCode = res ? res.statusCode : null;
    return { statusCode };
  }

  public render() {
    const { statusCode } = this.props;
    const title = statusCode ? (statusCode === 404 ? 'Not found' : 'Error') : 'Error';
    const message = statusCode
      ? statusCode === 404
        ? `Oops, you just hit a page that doesn't exist.`
        : `${statusCode}, something went wrong.`
      : 'Oops, something went wrong';

    return (
      <Layout pageTitle={title}>
        <HeaderText>{title}</HeaderText>
        <Section>
          <Wrapper collapseTop={true}>
            <Text>{message}</Text>
          </Wrapper>
        </Section>
      </Layout>
    );
  }
}

export default Error;
