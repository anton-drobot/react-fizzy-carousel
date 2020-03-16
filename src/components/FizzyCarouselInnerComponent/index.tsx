import React, { Component } from 'react';

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
        const { isInfinity, slidesToShow, slidesToScroll } = this.props;
        const { vector, activeSlide } = this.state;
        const nextVectorState = {
            vector
        };

        if (isInfinity && slidesToShow === 1 && slidesToScroll === 1) {
            // TODO: доделать правильное дублирование слайдов, которое зависит от количества вмещаемых элементов на экране
            const nextVector = [...vector];
            const count = Math.ceil((vector.length - 1) / 2);

            for (let i = 0; i <= count; i++) {
                const endUniqId = vector[vector.length - 1].uniqId + i + 1;
                const startUniqId = vector[0].uniqId - i - 1;

                this.itemsRefs[endUniqId] = React.createRef<HTMLDivElement>();
                this.itemsRefs[startUniqId] = React.createRef<HTMLDivElement>();

                nextVector.push({
                    index: vector[i].index,
                    uniqId: endUniqId
                });
                nextVector.unshift({
                    index: vector[vector[vector.length - 1].index - i].index,
                    uniqId: startUniqId
                });
            }

            nextVectorState.vector = nextVector;
        }

        this.setState(nextVectorState, () => {
            this.setState(
                {
                    translateX: this.getNextTranslateX(activeSlide)
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

    private handleDirectionButtonClick = (direction: 'previous' | 'next', e: React.MouseEvent): void => {
        const { isInfinity, slidesToShow, slidesToScroll, children } = this.props;
        const { activeSlide } = this.state;

        e.preventDefault();

        const sign = direction === 'previous' ? -1 : 1;
        const slidesCount = React.Children.count(children);
        const nextActiveSlide = (activeSlide + sign + slidesCount) % React.Children.count(children);
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
        const vector = [];

        for (let i = 0; i < slidesCount; i++) {
            vector.push({
                index: i,
                uniqId: i
            });
        }

        return {
            vector,
            activeSlide,
            translateX: 0,
            isPreventingAnimation: true
        };
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
                computedTranslateX + slidesRect.width / 2 - nextActiveSlideRect.left - nextActiveSlideRect.width / 2
            );
        }

        return Math.round(computedTranslateX - nextActiveSlideRect.left);
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
