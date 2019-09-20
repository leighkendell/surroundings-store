import * as Sentry from '@sentry/browser';
import React from 'react';
import { Button, Error, Section, Text } from '..';

class ErrorBoundary extends React.Component {
  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public state = {
    hasError: false,
  };

  public componentDidCatch(error: any, errorInfo: any) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  public render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <Section variation="secondary">
          <Error>
            <Text>
              Oh no, something went wrong. You can try reloading this page or
              tell us about what happened.
            </Text>
            <Button onClick={this.handleClick}>Report feedback</Button>
          </Error>
        </Section>
      );
    }

    return children;
  }

  private handleClick = () => {
    Sentry.showReportDialog();
  };
}

export default ErrorBoundary;
