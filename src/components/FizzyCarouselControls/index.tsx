import React, { useCallback } from 'react';

import IFizzyCarouselControlPropTypes from './IFizzyCarouselControlPropTypes';

interface ISliderArrowsPropTypes {
    previousControl?: React.ComponentType<IFizzyCarouselControlPropTypes>;
    nextControl?: React.ComponentType<IFizzyCarouselControlPropTypes>;
    onClick: (direction: 'previous' | 'next', e: React.MouseEvent) => void;
    isPreviousButtonDisabled: boolean;
    isNextButtonDisabled: boolean;
}

const FizzyCarouselControls: React.FC<ISliderArrowsPropTypes> = (props: ISliderArrowsPropTypes) => {
    const { previousControl, nextControl, onClick, isPreviousButtonDisabled, isNextButtonDisabled } = props;

    const handlePreviousClick = useCallback(
        (e: React.MouseEvent) => {
            onClick('previous', e);
        },
        [onClick]
    );

    const handleNextClick = useCallback(
        (e: React.MouseEvent) => {
            onClick('next', e);
        },
        [onClick]
    );

    return (
        <div className="FizzyCarousel__controls">
            {previousControl ? (
                React.createElement(previousControl, {
                    onClick: handlePreviousClick,
                    isDisabled: isPreviousButtonDisabled
                })
            ) : (
                <button
                    className="FizzyCarousel__previousControl"
                    type="button"
                    onClick={handlePreviousClick}
                    disabled={isPreviousButtonDisabled}
                >
                    Previous
                </button>
            )}

            {nextControl ? (
                React.createElement(nextControl, { onClick: handleNextClick, isDisabled: isNextButtonDisabled })
            ) : (
                <button
                    className="FizzyCarousel__nextControl"
                    type="button"
                    onClick={handleNextClick}
                    disabled={isNextButtonDisabled}
                >
                    Next
                </button>
            )}
        </div>
    );
};

export default FizzyCarouselControls;
