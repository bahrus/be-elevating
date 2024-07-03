import {BeHive, EMC, seed, MountObserver} from 'be-hive/be-hive.js';
import {AP} from './types';

export const emc: EMC<any, AP> = {
    base: 'be-elevating',
    map: {
        '0.0': {
            instanceOf: 'Object$entences',
            objValMapsTo: '.',
            regExpExts: {
                parsedStatements: [
                    
                ]
            }
        }
    },
    enhPropKey: 'beElevating',
    importEnh: async () => {
        const {BeElevating} = await import('./be-elevating.js');
        return BeElevating;
    }
}

const mose = seed(emc);

MountObserver.synthesize(document, BeHive, mose);