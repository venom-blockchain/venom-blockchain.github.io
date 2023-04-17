import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

const ImageSwitcher = ({ lightImageSrc, darkImageSrc, alt, ...props }) => {
    const { isDarkTheme } = useColorMode();

    return (
        <img
            src={isDarkTheme ? darkImageSrc.src : lightImageSrc.src}
            alt={alt}
            {...props}
        />
    )
}

export default ImageSwitcher;