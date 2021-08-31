function pluckFromNameTo(src, nom, obj) {
  if (typeof nom !== 'string') throw 'bad prop name';

  Object.defineProperty(obj, nom, {
    get() {
      return src[nom];
    },
    set(val) {
      src[nom] = val;
    },
  });
}

function pluckFrom(src, ...noms) {
  const obj = { _plucking: noms };

  noms.forEach((nom) => pluckFromNameTo(src, nom, obj));

  return obj;
}

function test() {
  const src = { foo: false, bar: null };
  const obj = pluckFrom(src, 'foo');
  obj.foo; //?
  obj.foo = true;
  obj; //?
  src; //?
}
test();

export default pluckFrom;
