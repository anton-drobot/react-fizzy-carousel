interface IElementRect {
    width: number;
    height: number;
    left: number;
    right: number;
    top: number;
    bottom: number;
}

/**
 * Returns the position of the element relative to the page and its size.
 */
export default function getElementRect(element: HTMLElement): IElementRect {
    const clientRect = element.getBoundingClientRect();
    const left = clientRect.left + window.pageXOffset;
    const top = clientRect.top + window.pageYOffset;

    return {
        width: clientRect.width,
        height: clientRect.height,
        right: left + clientRect.width,
        bottom: top + clientRect.height,
        left,
        top
    };
}
