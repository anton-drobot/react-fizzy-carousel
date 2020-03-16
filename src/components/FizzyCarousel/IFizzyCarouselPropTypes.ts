import React from 'react';

import IFizzyCarouselControlPropTypes from '../FizzyCarouselControls/IFizzyCarouselControlPropTypes';

export default interface IFizzyCarouselPropTypes {
    className?: string;
    slideClassName?: string;
    activeSlide?: number;
    hasArrows?: boolean;
    leftArrow?: React.ComponentType<IFizzyCarouselControlPropTypes>;
    rightArrow?: React.ComponentType<IFizzyCarouselControlPropTypes>;
    //onChangeClick?: (direction: 'previous' | 'next', e: React.MouseEvent) => void; // TODO
    //onReady?: () => void; // TODO
    isCenterMode?: boolean;
    isInfinity?: boolean;
    hasRewind?: boolean;
    //slidesToShow?: number; // TODO
    //slidesToScroll?: number; // TODO
    //animation?: 'scroll' | 'fade'; // TODO
    animationDuration?: number;
    //height?: 'max' | 'current'; // TODO
    children: React.ReactNode;
}
