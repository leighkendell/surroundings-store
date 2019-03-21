import React, { useEffect } from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  imageLoaded?: () => void;
}

const Image: React.FunctionComponent<Props> = ({ src, alt, imageLoaded, ...props }) => {
  const source = `https://res.cloudinary.com/dklnli1vg/image/fetch/f_auto/${src}`;
  const imageRef = React.createRef<HTMLImageElement>();

  const handleImageLoaded = () => {
    if (imageRef.current && imageLoaded) {
      imageRef.current.removeEventListener('load', handleImageLoaded);
      imageLoaded();
    }
  };

  useEffect(() => {
    if (!imageLoaded) {
      return;
    }

    // Fire imageLoaded function when the image loads
    if (imageRef.current) {
      if (imageRef.current.complete) {
        handleImageLoaded();
      } else {
        imageRef.current.addEventListener('load', handleImageLoaded);
      }
    }
  }, []);

  return <img src={source} alt={alt} ref={imageRef} {...props} />;
};

export default Image;
