import React, { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  imageLoaded?: () => void;
}

const Image: React.FunctionComponent<Props> = ({ src, alt, imageLoaded, ...props }) => {
  const source = `https://res.cloudinary.com/dklnli1vg/image/fetch/f_auto/q_auto/${src}`;
  const imageRef = React.createRef<HTMLImageElement>();
  const [loaded, updateLoaded] = useState(false);

  const handleImageLoaded = () => {
    if (imageRef.current && imageLoaded) {
      imageRef.current.removeEventListener('load', handleImageLoaded);
      imageLoaded();
    }
    updateLoaded(true);
  };

  useEffect(() => {
    // Fire imageLoaded function when the image loads
    if (imageRef.current) {
      if (imageRef.current.complete) {
        handleImageLoaded();
      } else {
        imageRef.current.addEventListener('load', handleImageLoaded);
      }
    }

    // Remove event listener
    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener('load', handleImageLoaded);
      }
    };
  }, []);

  const spring = useSpring({
    from: { opacity: 0 },
    opacity: loaded ? 1 : 0,
  });

  return <animated.img src={source} alt={alt} ref={imageRef} style={spring} {...props} />;
};

export default Image;
