import React, { Component } from 'react';
import throttle from 'lodash.throttle';

import IFizzyCarouselControlPropTypes from '../FizzyCarouselControls/IFizzyCarouselControlPropTypes';

import getElementRect from '../../lib/getElementRect';
import getElementTranslateValues from '../../lib/getElementTranslateValues';

import FizzyCarouselControls from '../FizzyCarouselControls';
import FizzyCarouselSlide from '../FizzyCarouselSlide';

interface IFizzyCarouselInnerComponentPropTypes {
    className?: string;
    slideClassName?: string;
    activeSlide: number;
    hasArrows: boolean;
    leftArrow?: React.ComponentType<IFizzyCarouselControlPropTypes>;
    rightArrow?: React.ComponentType<IFizzyCarouselControlPropTypes>;
    onChangeClick?: (direction: 'previous' | 'next', e: React.MouseEvent) => void; // TODO
    //onReady?: () => void; // TODO
    isCenterMode: boolean;
    isInfinity: boolean;
    hasRewind: boolean;
    slidesToShow: number; // TODO
    slidesToScroll: number; // TODO
    //animation: 'scroll' | 'fade'; // TODO
    animationDuration: number;
    //height: 'max' | 'current'; // TODO
    children: React.ReactNode;
}

interface IFizzyCarouselInnerComponentState {
    vector: Array<{
        index: number;
        uniqId: number;
    }>;
    activeSlide: number;
    translateX: number;
    isPreventingAnimation: boolean;
}

const THROTTLE_DELAY = 300;

export default class FizzyCarouselInnerComponent extends Component<IFizzyCarouselInnerComponentPropTypes, IFizzyCarouselInnerComponentState> {
    private slidesRef = React.createRef<HTMLDivElement>();
    private slidesWrapperRef = React.createRef<HTMLDivElement>();
    private itemsRefs: Record<number, React.RefObject<HTMLDivElement>> = {};

    public constructor(props: IFizzyCarouselInnerComponentPropTypes) {
        super(props);

        this.state = this.getDefaultStateFromProps(props);

        React.Children.forEach(props.children, (child, index) => {
            this.itemsRefs[index] = React.createRef<HTMLDivElement>();
        });
    }

    public componentDidMount(): void {
        this.rebuildSlides();

        window.addEventListener('resize', this.handleResize);
    }

    public componentWillUnmount(): void {
        window.removeEventListener('resize', this.handleResize);
    }

    private handleResize = throttle(() => {
        this.rebuildSlides();
    }, THROTTLE_DELAY);

    private handleDirectionButtonClick = (direction: 'previous' | 'next', e: React.MouseEvent): void => {
        const { hasRewind, isInfinity, slidesToShow, slidesToScroll, children } = this.props;
        const { activeSlide } = this.state;

        e.preventDefault();

        const sign = direction === 'previous' ? -1 : 1;
        const slidesCount = React.Children.count(children);
        const nextActiveSlide = (activeSlide + sign + slidesCount) % slidesCount;
        const isMovingToStart = nextActiveSlide === 0 && activeSlide === slidesCount - 1;
        const isMovingToEnd = nextActiveSlide === slidesCount - 1 && activeSlide === 0;

        if (slidesToShow === 1 && slidesToScroll === 1) {
            if (isInfinity && (isMovingToStart || isMovingToEnd)) {
                const temporaryNextActiveSlide = isMovingToStart ? -1 : slidesCount;

                this.setState(
                    {
                        activeSlide: temporaryNextActiveSlide,
                        translateX: this.getNextTranslateX(temporaryNextActiveSlide),
                        isPreventingAnimation: true
                    },
                    () => {
                        this.setState(
                            {
                                activeSlide: nextActiveSlide,
                                translateX: this.getNextTranslateX(nextActiveSlide),
                                isPreventingAnimation: false
                            },
                            () => {
                                // TODO: onChangeClick event
                            }
                        );
                    }
                );
            } else {
                if (!hasRewind && ((activeSlide === 0 && sign < 0) || (activeSlide === slidesCount - 1 && sign > 0))) {
                    return;
                }

                this.setState(
                    {
                        activeSlide: nextActiveSlide,
                        translateX: this.getNextTranslateX(nextActiveSlide)
                    },
                    () => {
                        // TODO: onChangeClick event
                    }
                );
            }
        }
    };

    private getDefaultStateFromProps(props: IFizzyCarouselInnerComponentPropTypes): IFizzyCarouselInnerComponentState {
        const { activeSlide, children } = props;
        const slidesCount = React.Children.count(children);
        const vector = this.buildDefaultVector(slidesCount);

        return {
            vector,
            activeSlide,
            translateX: 0,
            isPreventingAnimation: false
        };
    }

    private rebuildSlides(): void {
        const { activeSlide } = this.state;
        const nextVectorState = {
            vector: this.buildVector()
        };

        this.setState(nextVectorState, () => {
            this.setState(
                {
                    translateX: this.getNextTranslateX(activeSlide),
                    isPreventingAnimation: true
                },
                () => {
                    setTimeout(() => {
                        this.setState(
                            {
                                isPreventingAnimation: false
                            },
                            () => {
                                // TODO: onReady event
                            }
                        );
                    }, 0);
                }
            );
        });
    }

    private buildDefaultVector(slidesCount: number): IFizzyCarouselInnerComponentState['vector'] {
        const vector = [];

        for (let i = 0; i < slidesCount; i++) {
            vector.push({
                index: i,
                uniqId: i
            });
        }

        return vector;
    }

    private buildVector(): IFizzyCarouselInnerComponentState['vector'] {
        const { isCenterMode, isInfinity, children } = this.props;
        const slidesCount = React.Children.count(children);
        const defaultVector = this.buildDefaultVector(slidesCount);
        const vector = [...defaultVector];

        if (!this.slidesRef.current || !isInfinity) {
            return vector;
        }

        let accWidthRightSide = 0;
        let accWidtLeftSide = 0;
        let nextSlideForRightSide = 0;
        let nextSlideForLeftSide = slidesCount - 1;
        const slidesRect = getElementRect(this.slidesRef.current);

        while (accWidthRightSide < (isCenterMode ? (slidesRect.width / 2) : (slidesRect.width * 1.5))) {
            if (this.itemsRefs[nextSlideForRightSide] && this.itemsRefs[nextSlideForRightSide].current) {
                accWidthRightSide += getElementRect(this.itemsRefs[nextSlideForRightSide].current as HTMLDivElement).outerWidth
            }

            const uniqId = vector[vector.length - 1].uniqId + 1;
            this.itemsRefs[uniqId] = React.createRef<HTMLDivElement>();

            vector.push({
                index: defaultVector[nextSlideForRightSide].index,
                uniqId
            });

            nextSlideForRightSide = (nextSlideForRightSide + 1) % slidesCount;
        }

        while (accWidtLeftSide < slidesRect.width / 2) {
            if (this.itemsRefs[nextSlideForLeftSide] && this.itemsRefs[nextSlideForLeftSide].current) {
                accWidtLeftSide += getElementRect(this.itemsRefs[nextSlideForLeftSide].current as HTMLDivElement).outerWidth
            }

            const uniqId = vector[0].uniqId - 1;
            this.itemsRefs[uniqId] = React.createRef<HTMLDivElement>();

            vector.unshift({
                index: defaultVector[nextSlideForLeftSide].index,
                uniqId
            });

            nextSlideForLeftSide = (nextSlideForLeftSide + slidesCount - 1) % slidesCount;
        }

        return vector;
    }

    private getNextTranslateX(nextActiveSlide: number): number {
        const { isCenterMode } = this.props;

        if (
            !this.slidesRef.current ||
            !this.slidesWrapperRef.current ||
            !this.itemsRefs[nextActiveSlide] ||
            !this.itemsRefs[nextActiveSlide].current
        ) {
            return 0;
        }

        const slidesRect = getElementRect(this.slidesRef.current);
        const nextActiveSlideRect = getElementRect(this.itemsRefs[nextActiveSlide].current as HTMLDivElement);
        const computedTranslateX = getElementTranslateValues(this.slidesWrapperRef.current).translateX;

        if (isCenterMode) {
            return Math.round(
                computedTranslateX + slidesRect.width / 2 - nextActiveSlideRect.left - nextActiveSlideRect.width / 2 + slidesRect.left
            );
        }

        return Math.round(computedTranslateX - nextActiveSlideRect.left + slidesRect.left);
    }

    public render(): React.ReactNode {
        const {
            className,
            slideClassName,
            hasArrows,
            leftArrow,
            rightArrow,
            isInfinity,
            hasRewind,
            animationDuration,
            children
        } = this.props;
        const { vector, activeSlide, translateX, isPreventingAnimation } = this.state;
        const isPreviousButtonDisabled = !isInfinity && !hasRewind && activeSlide === 0;
        const isNextButtonDisabled = !isInfinity && !hasRewind && activeSlide === React.Children.count(children) - 1;
        const elements = React.Children.toArray(children);
        const transformStyle = `translateX(${translateX}px) translateZ(0px)`;
        const transitionStyle = !isPreventingAnimation
            ? `transform ${animationDuration}ms ease-in-out 0s`
            : undefined;

        return (
            <div className={['FizzyCarousel', className].filter(Boolean).join(' ')}>
                <div className="FizzyCarousel__slides" ref={this.slidesRef}>
                    <div
                        className="FizzyCarousel__slidesWrapper"
                        ref={this.slidesWrapperRef}
                        style={{
                            MozTransition: transitionStyle,
                            WebkitTransform: transformStyle,
                            WebkitTransition: transitionStyle,
                            msTransform: transformStyle,
                            msTransition: transitionStyle,
                            OTransform: transformStyle,
                            OTransition: transitionStyle,
                            transform: transformStyle,
                            transition: transitionStyle
                        }}
                    >
                        {vector.map(({ index, uniqId }) => (
                            <FizzyCarouselSlide key={uniqId} innerRef={this.itemsRefs[uniqId]} className={slideClassName}>
                                {elements[index]}
                            </FizzyCarouselSlide>
                        ))}
                    </div>
                </div>

                {hasArrows && (
                    <FizzyCarouselControls
                        previousControl={leftArrow}
                        nextControl={rightArrow}
                        onClick={this.handleDirectionButtonClick}
                        isPreviousButtonDisabled={isPreviousButtonDisabled}
                        isNextButtonDisabled={isNextButtonDisabled}
                    />
                )}
            </div>
        );
    }
}
