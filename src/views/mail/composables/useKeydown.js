import { onBeforeUnmount } from "@vue/runtime-core";

function useKeydown(combos) {
  // combos is [{key, fn}]

  function listener(evt) {
    combos.forEach(combo => {
      if (evt.key === combo.key) combo.fn();
    });
  }

  window.addEventListener("keydown", listener);

  onBeforeUnmount(() => {
    window.removeEventListener("keydown", listener);
  });
}

export default useKeydown;
