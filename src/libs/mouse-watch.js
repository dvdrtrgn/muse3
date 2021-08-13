import { throttle } from 'lodash';
import { reactive } from 'vue';
import { cardinal, slope360 } from './angles.js';

function calc(prev, evt, move) {
  move.x = evt.x - prev.x;
  move.y = evt.y - prev.y;
}

function record(evt) {
  calc(this._old, evt, this.movement);
  this._old.x = evt.x;
  this._old.y = evt.y;
  this.degree = slope360(this.movement);
  this.bearing = cardinal(this.degree);
}

function MouseWatch(sel, ms = 66) {
  let API = {
    _ele: null,
    _old: {
      x: 0,
      y: 0,
    },
    degree: 'pending',
    bearing: 'pending',
    movement: reactive({
      x: 0,
      y: 0,
    }),
  };
  let sample = throttle(record.bind(API), ms);

  function getElement() {
    let ele = typeof sel === 'string' ? document.querySelector(sel) : sel;
    API._ele = ele;
    if (!ele) throw 'MouseWatch: no element';
  }

  API.bind = function() {
    if (API._ele) return;
    getElement();
    API._ele.addEventListener('mousemove', sample);
    console.log('bind', API._ele);
  };

  API.unbind = function() {
    console.log('unbind', API._ele);
    if (!API._ele) return;
    API._ele.removeEventListener('mousemove', sample);
    API._ele = null;
  };

  return API;
}

export default MouseWatch;
