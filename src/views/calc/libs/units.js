// https://mathjs.org/docs/datatypes/units.html

import * as math from 'mathjs';

// math.createUnit('knot', { definition: '0.514444 m/s', aliases: ['knots', 'kt', 'kts'] });
math.createUnit('furlong', { definition: '220 yards', aliases: ['fl'] });
// math.evaluate('1 mile to furlong'); // 8 furlong

export default {
    // linear
    foot: math.unit('1ft').value,
    yard: math.unit('1yard').value,
    rod: math.unit('1rod').value,
    chain: math.unit('1chain').value,
    furlong: math.unit('1furlong').value,
    foo: math.evaluate('1 mile to furlong').toNumber(),
};
