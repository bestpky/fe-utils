import {remove} from './remove';

export type Callback = (rect: DOMRect, oldRect: DOMRect) => unknown;

interface Item {
  callbacks: Callback[];
  contentRect: DOMRect
}

const elAndCbMap: Map<Element, Item> = new Map();

const ro = new ResizeObserver(entries => {
  const elAndCbEntries = Array.from(elAndCbMap.entries());
  entries.forEach((entry) => {
    const i = elAndCbEntries.findIndex(([el]) => el === entry.target);
    if (i !== -1) {
      const [, item] = elAndCbEntries[i];
      const { contentRect: oldRect, callbacks: fns } = item;
      item.contentRect = entry.contentRect;
      fns.forEach(fn => {
        fn(item.contentRect, oldRect);
      });
    }
  });
});

export function resizeWatch(callback: Callback, el: Element = document.documentElement) {
  const item: Item = elAndCbMap.get(el) ?? {
    contentRect: el.getBoundingClientRect(),
    callbacks: [] as Callback[],
  };
  const fns = item.callbacks;
  fns.push(callback);
  elAndCbMap.set(el, item);
  ro.observe(el);
  return () => {
    remove(fns, (cb: Callback) => cb === callback);
    if (!fns.length) {
      elAndCbMap.delete(el);
      ro.unobserve(el);
    }
  };
}

