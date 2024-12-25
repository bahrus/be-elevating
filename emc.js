// @ts-check
import { BeHive, seed, MountObserver } from 'be-hive/be-hive.js';
/** @import {EMC} from './ts-refs/trans-render/be/types' */
/** @import {Actions, PAP,  AP, BAP} from './ts-refs/be-elevating/types' */;

const dssKeys = [['dependencyPart', 'remoteSpecifiers[]']];
const dependencyPart = String.raw `(?<dependencyPart>.*)`;
const toRemoteSpecifiers = String.raw `^(t|T)o ${dependencyPart}`;
const ofLocalPropToRemoteSpecifiers = String.raw `^(o|O)f (?<localPropToElevate>[\w\:\$\+]+) to ${dependencyPart}`;
const onLocalEventType = String.raw ` on (?<localEventType>.*)`;
const ofLocalPropToRemoteSpecifiersOnLocalEventType = String.raw `${ofLocalPropToRemoteSpecifiers}${onLocalEventType}`;
const toRemoteSpecifiersOnLocalEventType = String.raw `${toRemoteSpecifiers}${onLocalEventType}`;

/**
 * @type {[string, string]}
 */
const rssTors = ['dependencyPart', 'remoteSpecifier'];

/**
 * @type {EMC<any, BAP>}
 */
export const emc = {
    base: 'be-elevating',
    branches: ['', 'pass-srv'],
    map: {
        '0.0': {
            instanceOf: 'Object$entences',
            objValMapsTo: '.',
            regExpExts: {
                bindingRules: [
                    {
                        regExp: ofLocalPropToRemoteSpecifiersOnLocalEventType,
                        defaultVals: {},
                        dssKeys: [rssTors],
                    },
                    {
                        regExp: toRemoteSpecifiersOnLocalEventType,
                        defaultVals: {},
                        dssKeys: [rssTors],
                    },
                    {
                        regExp: ofLocalPropToRemoteSpecifiers,
                        defaultVals: {},
                        dssKeys: [rssTors],
                    },
                    {
                        regExp: toRemoteSpecifiers,
                        defaultVals: {},
                        dssKeys: [rssTors],
                    }
                ]
            },
        },
        '1.0': {
            instanceOf: 'Boolean',
            mapsTo: 'passSRV'
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
