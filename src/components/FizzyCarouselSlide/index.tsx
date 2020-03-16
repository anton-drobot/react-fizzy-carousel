import React from 'react';

interface IFizzyCarouselSlidePropTypes {
    innerRef?: React.RefObject<HTMLDivElement>;
    className?: string;
    children: React.ReactNode;
}

const FizzyCarouselSlide: React.FC<IFizzyCarouselSlidePropTypes> = (props: IFizzyCarouselSlidePropTypes) => {
    const { className, innerRef, children } = props;

    return (
        <div ref={innerRef} className={['FizzyCarousel__slide', className].filter(Boolean).join(' ')}>
            {children}
        </div>
    );
};

export default FizzyCarouselSlide;

