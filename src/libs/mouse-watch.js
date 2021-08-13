import { throttle } from 'lodash';
import { reactive } from 'vue';

function MouseWatch(sel, ms = 333) {
  let API = {
    ele: null,
    direction: null,
    lastpoint: reactive({
      x: 0,
      y: 0,
    }),
  };
  let record = _record.bind(API);
  let sample = throttle(record, ms);

  function getElement() {
    let ele = typeof sel === 'string' ? document.querySelector(sel) : sel;
    API.ele = ele;
    if (!ele) throw 'MouseWatch: no element';
  }

  /*
    provide accessor for angle of change
  */

  API.bind = function() {
    if (API.ele) return;
    getElement();
    API.ele.addEventListener('mousemove', sample);
  };

  API.unbind = function() {
    if (!API.ele) return;
    API.ele.removeEventListener('mousemove', sample);
    API.ele = null;
  };

  return API;
}

export default MouseWatch;

function calc(last, move) {
  console.log('calc', move);
  // compare code here
  // console.log({ lastpoint, x, y });
  return `${move.x - last.x}, ${move.y - last.y}`;
}

function _record(evt) {
  let move = {
    x: evt.x,
    y: evt.y,
  };
  this.direction = calc(this.lastpoint, move);
  this.lastpoint.x = move.x;
  this.lastpoint.y = move.y;
}
