import React from 'react';

import IFizzyCarouselPropTypes from './IFizzyCarouselPropTypes';

import FizzyCarouselInnerComponent from "../FizzyCarouselInnerComponent";

interface IFizzyCarouselState {
    vector: Array<{
        index: number;
        uniqId: number;
    }>;
    activeSlide: number;
    translateX: number;
    isPreventingAnimation: boolean;
}

export default class FizzyCarousel extends React.Component<IFizzyCarouselPropTypes, IFizzyCarouselState> {
    public static defaultProps = {
        activeSlide: 0,
        hasArrows: true,
        isCenterMode: false,
        isInfinity: false,
        hasRewind: false,
        animationDuration: 300
    };

    public render(): React.ReactNode {
        const {
            className,
            slideClassName,
            activeSlide,
            hasArrows,
            leftArrow,
            rightArrow,
            isCenterMode,
            isInfinity,
            hasRewind,
            animationDuration,
            children
        } = this.props;

        return (
            <FizzyCarouselInnerComponent
                className={className}
                slideClassName={slideClassName}
                activeSlide={activeSlide as NonNullable<IFizzyCarouselPropTypes['activeSlide']>}
                hasArrows={hasArrows as NonNullable<IFizzyCarouselPropTypes['hasArrows']>}
                leftArrow={leftArrow}
                rightArrow={rightArrow}
                isCenterMode={isCenterMode as NonNullable<IFizzyCarouselPropTypes['isCenterMode']>}
                isInfinity={isInfinity as NonNullable<IFizzyCarouselPropTypes['isInfinity']>}
                hasRewind={hasRewind as NonNullable<IFizzyCarouselPropTypes['hasRewind']>}
                slidesToShow={1}
                slidesToScroll={1}
                animationDuration={animationDuration as NonNullable<IFizzyCarouselPropTypes['animationDuration']>}
            >
                {children}
            </FizzyCarouselInnerComponent>
        );
    }
}
