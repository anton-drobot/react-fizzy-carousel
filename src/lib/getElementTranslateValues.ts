interface IParsedElementMatrix {
    translateX: number;
    translateY: number;
    translateZ: number;
}

const DEFAULT_VALUES: IParsedElementMatrix = {
    translateX: 0,
    translateY: 0,
    translateZ: 0
};

export default function getElementTranslateValues(element: HTMLElement): IParsedElementMatrix {
    const style = window.getComputedStyle(element);

    const matrix =
        style.getPropertyValue('-webkit-transform') ||
        style.getPropertyValue('-moz-transform') ||
        style.getPropertyValue('-ms-transform') ||
        style.getPropertyValue('-o-transform') ||
        style.getPropertyValue('transform');

    if (!matrix) {
        return DEFAULT_VALUES;
    }

    const match2d = matrix.match(/^matrix\((.+)\)$/);

    if (match2d) {
        const values = match2d[1].split(', ');

        return {
            translateX: parseFloat(values[4]),
            translateY: parseFloat(values[5]),
            translateZ: 0
        };
    }

    const match3d = matrix.match(/^matrix3d\((.+)\)$/);

    if (match3d) {
        const values = match3d[1].split(', ');

        return {
            translateX: parseFloat(values[12]),
            translateY: parseFloat(values[13]),
            translateZ: parseFloat(values[14])
        };
    }

    return DEFAULT_VALUES;
}
