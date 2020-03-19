import React from 'react';

import IFizzyCarouselPropTypes from './IFizzyCarouselPropTypes';

import FizzyCarouselInnerComponent from '../FizzyCarouselInnerComponent';

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
        controls: true,
        centerMode: false,
        infinity: false,
        rewind: false,
        animationDuration: 300
    };

    public render(): React.ReactNode {
        const {
            className,
            slideClassName,
            activeSlide,
            controls,
            leftControl,
            rightControl,
            centerMode,
            infinity,
            rewind,
            animationDuration,
            children
        } = this.props;

        return (
            <FizzyCarouselInnerComponent
                className={className}
                slideClassName={slideClassName}
                activeSlide={activeSlide as NonNullable<IFizzyCarouselPropTypes['activeSlide']>}
                controls={controls as NonNullable<IFizzyCarouselPropTypes['controls']>}
                leftControl={leftControl}
                rightControl={rightControl}
                centerMode={centerMode as NonNullable<IFizzyCarouselPropTypes['centerMode']>}
                infinity={infinity as NonNullable<IFizzyCarouselPropTypes['infinity']>}
                rewind={rewind as NonNullable<IFizzyCarouselPropTypes['rewind']>}
                slidesToShow={1}
                slidesToScroll={1}
                animationDuration={animationDuration as NonNullable<IFizzyCarouselPropTypes['animationDuration']>}
            >
                {children}
            </FizzyCarouselInnerComponent>
        );
    }
}
