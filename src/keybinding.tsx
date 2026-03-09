import { type RefObject, useEffect } from 'react';

export type KeybindingProps = {
  onKey: (e: KeyboardEvent) => void;
  type?: 'keydown' | 'keyup';
  target?:
    | string
    | HTMLElement
    | Document
    | Window
    | RefObject<HTMLElement | null>;
  preventInputConflict?: boolean;
  preventContentEditableConflict?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
};

const TARGETS_BLACKLIST = ['textarea', 'input', 'select'];

function isRefObject(
  target: NonNullable<KeybindingProps['target']>,
): target is RefObject<HTMLElement | null> {
  return typeof target === 'object' && 'current' in target;
}

/**
 * Get the actual target to which we should attach the event.
 * Returns null if a ref is passed but not yet mounted.
 */
function getTarget(
  target: NonNullable<KeybindingProps['target']>,
): HTMLElement | Document | Window | null {
  if (typeof target === 'string') {
    const element = document.querySelector<HTMLElement>(target);
    if (!element) {
      throw new Error(
        `Selector "${target}" returned null (on keybinding mount)`,
      );
    }

    return element;
  }

  if (isRefObject(target)) {
    return target.current;
  }

  return target;
}

/**
 * Attaches an event to the DOM
 */
export default function Keybinding(props: KeybindingProps) {
  const {
    onKey,
    type = 'keydown',
    target = document, // Probably will make server-side rendering crash
    preventInputConflict = false,
    preventContentEditableConflict = false,
    preventDefault = false,
    stopPropagation = false,
  } = props;

  useEffect(() => {
    const actualTarget = getTarget(target);

    if (!actualTarget) return;

    const onKeyEvent = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;

      if (target != null) {
        let canDispatch = true;

        if (
          preventInputConflict &&
          TARGETS_BLACKLIST.includes(target.tagName.toLowerCase())
        ) {
          canDispatch = false;
        }

        if (preventContentEditableConflict && checkIfContentEditable(target)) {
          canDispatch = false;
        }

        if (canDispatch) {
          if (preventDefault) e.preventDefault();
          if (stopPropagation) e.stopPropagation();
          onKey(e);
        }
      }
    };

    actualTarget.addEventListener(type, onKeyEvent as EventListener);

    return () => {
      actualTarget.removeEventListener(type, onKeyEvent as EventListener);
    };
  }, [
    target,
    type,
    onKey,
    preventDefault,
    stopPropagation,
    preventInputConflict,
    preventContentEditableConflict,
  ]);

  return null;
}

/**
 * Return true if the current DOM node or one of its parents has contenteditable activated
 */
function checkIfContentEditable(node: HTMLElement) {
  return (
    node.closest('[contenteditable]:not([contenteditable="false"])') !== null
  );
}
