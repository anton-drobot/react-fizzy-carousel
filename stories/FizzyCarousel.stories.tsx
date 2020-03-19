import React, { useCallback } from 'react';
import { action } from '@storybook/addon-actions';

import { FizzyCarousel, IFizzyCarouselControlPropTypes } from '../src';

import '../styles.css';

interface ISimpleSlideProps {
    className?: string;
    children: React.ReactNode;
}

const SimpleSlide: React.FC<ISimpleSlideProps> = (props: ISimpleSlideProps) => {
    const { className, children } = props;

    return <div className={['FizzyCarouselSimpleSlide', className].filter(Boolean).join(' ')}>{children}</div>;
};

const CustomControlsPrev: React.FC<IFizzyCarouselControlPropTypes> = (props: IFizzyCarouselControlPropTypes) => {
    const { isDisabled, onClick } = props;
    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            action('custom prev button clicked');
            onClick(e);
        },
        [onClick, action]
    );
    const disabledClass = isDisabled && 'FizzyCarouselCustomButton_disabled';

    return (
        <div className={['FizzyCarouselCustomButton', disabledClass].filter(Boolean).join(' ')} onClick={handleClick}>
            Previous Slide
        </div>
    );
};

const CustomControlsNext: React.FC<IFizzyCarouselControlPropTypes> = (props: IFizzyCarouselControlPropTypes) => {
    const { isDisabled, onClick } = props;
    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            action('custom next button clicked');
            onClick(e);
        },
        [onClick, action]
    );
    const disabledClass = isDisabled && 'FizzyCarouselCustomButton_disabled';

    return (
        <div className={['FizzyCarouselCustomButton', disabledClass].filter(Boolean).join(' ')} onClick={handleClick}>
            Next Slide
        </div>
    );
};

export const Example = (): React.ReactNode => (
    <FizzyCarousel>
        <SimpleSlide>1</SimpleSlide>
        <SimpleSlide>2</SimpleSlide>
        <SimpleSlide className="FizzyCarouselSimpleSlide_wide">wide</SimpleSlide>
        <SimpleSlide>4</SimpleSlide>
        <SimpleSlide className="FizzyCarouselSimpleSlide_thin">thin</SimpleSlide>
        <SimpleSlide>6</SimpleSlide>
        <SimpleSlide>7</SimpleSlide>
        <SimpleSlide>8</SimpleSlide>
    </FizzyCarousel>
);

Example.story = {
    name: 'Default Example'
};

export const ActiveSlide = (): React.ReactNode => (
    <FizzyCarousel activeSlide={2}>
        <SimpleSlide>1</SimpleSlide>
        <SimpleSlide>2</SimpleSlide>
        <SimpleSlide className="FizzyCarouselSimpleSlide_wide">wide</SimpleSlide>
        <SimpleSlide>4</SimpleSlide>
        <SimpleSlide className="FizzyCarouselSimpleSlide_thin">thin</SimpleSlide>
        <SimpleSlide>6</SimpleSlide>
        <SimpleSlide>7</SimpleSlide>
        <SimpleSlide>8</SimpleSlide>
    </FizzyCarousel>
);

ActiveSlide.story = {
    name: 'Active Slide'
};

export const RewindSlides = (): React.ReactNode => (
    <FizzyCarousel rewind>
        <SimpleSlide>1</SimpleSlide>
        <SimpleSlide>2</SimpleSlide>
        <SimpleSlide>3</SimpleSlide>
        <SimpleSlide>4</SimpleSlide>
    </FizzyCarousel>
);

RewindSlides.story = {
    name: 'Rewind Slides'
};

export const InfinityScroll = (): React.ReactNode => (
    <FizzyCarousel infinity>
        <SimpleSlide>1</SimpleSlide>
        <SimpleSlide>2</SimpleSlide>
        <SimpleSlide className="FizzyCarouselSimpleSlide_wide">wide</SimpleSlide>
        <SimpleSlide>4</SimpleSlide>
        <SimpleSlide className="FizzyCarouselSimpleSlide_thin">thin</SimpleSlide>
        <SimpleSlide>6</SimpleSlide>
        <SimpleSlide>7</SimpleSlide>
        <SimpleSlide>8</SimpleSlide>
    </FizzyCarousel>
);

InfinityScroll.story = {
    name: 'Infinity Scroll'
};

export const CenterMode = (): React.ReactNode => (
    <FizzyCarousel centerMode>
        <SimpleSlide>1</SimpleSlide>
        <SimpleSlide>2</SimpleSlide>
        <SimpleSlide className="FizzyCarouselSimpleSlide_wide">wide</SimpleSlide>
        <SimpleSlide>4</SimpleSlide>
        <SimpleSlide className="FizzyCarouselSimpleSlide_thin">thin</SimpleSlide>
        <SimpleSlide>6</SimpleSlide>
        <SimpleSlide>7</SimpleSlide>
        <SimpleSlide>8</SimpleSlide>
    </FizzyCarousel>
);

CenterMode.story = {
    name: 'Center Mode'
};

export const CenterModeAndRewindSlides = (): React.ReactNode => (
    <FizzyCarousel centerMode rewind>
        <SimpleSlide>1</SimpleSlide>
        <SimpleSlide>2</SimpleSlide>
        <SimpleSlide>3</SimpleSlide>
        <SimpleSlide>4</SimpleSlide>
    </FizzyCarousel>
);

CenterModeAndRewindSlides.story = {
    name: 'Center Mode and Rewind Slides'
};

export const CenterModeAndInfinityScroll = (): React.ReactNode => (
    <FizzyCarousel centerMode infinity>
        <SimpleSlide>1</SimpleSlide>
        <SimpleSlide>2</SimpleSlide>
        <SimpleSlide>3</SimpleSlide>
        <SimpleSlide>4</SimpleSlide>
    </FizzyCarousel>
);

CenterModeAndInfinityScroll.story = {
    name: 'Center Mode and Infinity Scroll'
};

export const AnimationDuration = (): React.ReactNode => (
    <FizzyCarousel animationDuration={2000}>
        <SimpleSlide>1</SimpleSlide>
        <SimpleSlide>2</SimpleSlide>
        <SimpleSlide>3</SimpleSlide>
        <SimpleSlide>4</SimpleSlide>
    </FizzyCarousel>
);

AnimationDuration.story = {
    name: 'Animation Duration'
};

export const CustomControls = (): React.ReactNode => (
    <FizzyCarousel leftControl={CustomControlsPrev} rightControl={CustomControlsNext}>
        <SimpleSlide>1</SimpleSlide>
        <SimpleSlide>2</SimpleSlide>
        <SimpleSlide>3</SimpleSlide>
        <SimpleSlide>4</SimpleSlide>
    </FizzyCarousel>
);

CustomControls.story = {
    name: 'Custom Controls'
};

export const WithoutControls = (): React.ReactNode => (
    <FizzyCarousel controls={false}>
        <SimpleSlide>1</SimpleSlide>
        <SimpleSlide>2</SimpleSlide>
        <SimpleSlide>3</SimpleSlide>
        <SimpleSlide>4</SimpleSlide>
    </FizzyCarousel>
);

WithoutControls.story = {
    name: 'Without Controls'
};

export default {
    title: 'FizzyCarousel',
    component: FizzyCarousel
};
