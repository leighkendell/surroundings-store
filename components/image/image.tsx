import React from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Image: React.FunctionComponent<Props> = ({ src, ...props }) => {
  const source = `https://res.cloudinary.com/dklnli1vg/image/fetch/f_auto/${src}`;
  return <img src={source} {...props} />;
};

export default Image;
