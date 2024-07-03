import { BeHive, seed, MountObserver } from 'be-hive/be-hive.js';
export const emc = {
    base: 'be-elevating',
    map: {
        '0.0': {
            instanceOf: 'Object$entences',
            objValMapsTo: '.',
            regExpExts: {
                parsedStatements: []
            }
        }
    },
    enhPropKey: 'beElevating',
    importEnh: async () => {
        const { BeElevating } = await import('./be-elevating.js');
        return BeElevating;
    }
};
const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);
