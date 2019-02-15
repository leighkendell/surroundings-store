import React from 'react';
import styles from './heading.scss';

interface Props extends React.HtmlHTMLAttributes<HTMLHeadingElement> {
  type: 'h1' | 'h2' | 'h3';
}

class Heading extends React.PureComponent<Props> {
  public static defaultProps = {
    type: 'h1',
  };

  public render() {
    const { type, children, style } = this.props;
    const Tag = type;

    return (
      <Tag className={styles[type]} style={style}>
        {children}
      </Tag>
    );
  }
}

export default Heading;
