import { type RefObject, useCallback, useEffect } from 'react';

export type KeybindingProps = {
  onKey: (e: KeyboardEvent) => void;
  type?: 'keydown' | 'keyup';
  target?: string | HTMLElement | Document | Window | RefObject<HTMLElement>;
  preventInputConflict?: boolean;
  preventContentEditableConflict?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
};

const TARGETS_BLACKLIST = ['textarea', 'input', 'select'];

function isRefObject(
  target: NonNullable<KeybindingProps['target']>,
): target is RefObject<HTMLElement> {
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

  const onKeyEvent = useCallback(
    (e: KeyboardEvent) => {
      // is actually a KeyboardEvent
      if (preventDefault) e.preventDefault();
      if (stopPropagation) e.stopPropagation();

      const target = e.target as HTMLElement | null;

      if (target) {
        let canDispatch = true;

        if (
          preventInputConflict &&
          TARGETS_BLACKLIST.indexOf(target.tagName.toLowerCase()) > -1
        ) {
          canDispatch = false;
        }

        if (preventContentEditableConflict && checkIfContentEditable(target)) {
          canDispatch = false;
        }

        if (canDispatch) onKey(e);
      }
    },
    [
      preventDefault,
      stopPropagation,
      preventInputConflict,
      preventContentEditableConflict,
      onKey,
    ],
  );

  useEffect(() => {
    const actualTarget = getTarget(target);

    if (!actualTarget) return;

    actualTarget.addEventListener(type, onKeyEvent as EventListener);

    return () => {
      actualTarget.removeEventListener(type, onKeyEvent as EventListener);
    };
  }, [target, type, onKeyEvent]);

  return null;
}

/**
 * Return true if the current DOM node or one of its parent has the contenteditable
 * attribute activated
 */
function checkIfContentEditable(node: HTMLElement | null) {
  if (node === null) {
    return false;
  }

  if (node.getAttribute('contenteditable') === 'true') {
    return true;
  }

  return checkIfContentEditable(node.parentElement);
}
