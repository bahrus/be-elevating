import {BeHive, EMC, seed, MountObserver} from 'be-hive/be-hive.js';
import {AP} from './types';

export const emc: EMC<any, AP> = {
    base: 'be-elevating',
    enhPropKey: 'beElevating',
    importEnh: async () => {
        const {BeElevating} = await import('./be-elevating.js');
        return BeElevating;
    }
}