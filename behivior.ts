import {BeHive, EMC, seed, MountObserver} from 'be-hive/be-hive.js';
import {AP} from './types';

const dssKeys = [['dependencyPart', 'remoteSpecifiers[]']] as [string, string][];

const dependencyPart = String.raw `(?<dependencyPart>.*)`;
const toRemoteSpecifiers = String.raw `^(t|T)o ${dependencyPart}`;
const ofLocalPropToRemoteSpecifiers = String.raw `^(o|O)f (?<localPropToElevate>[\w\:\$\+]+) to ${dependencyPart}`;
const onLocalEventType = String.raw ` on (?<localEventType>.*)`;
const ofLocalPropToRemoteSpecifiersOnLocalEventType = String.raw `${ofLocalPropToRemoteSpecifiers}${onLocalEventType}`;
const toRemoteSpecifiersOnLocalEventType = String.raw `${toRemoteSpecifiers}${onLocalEventType}`;

export const emc: EMC<any, AP> = {
    base: 'be-elevating',
    map: {
        '0.0': {
            instanceOf: 'Object$entences',
            objValMapsTo: '.',
            regExpExts: {
                parsedStatements: [
                    {
                        regExp: ofLocalPropToRemoteSpecifiersOnLocalEventType,
                        defaultVals: {},
                        dssKeys,
                    },
                    {
                        regExp: toRemoteSpecifiersOnLocalEventType,
                        defaultVals: {},
                        dssKeys,
                    },
                    {
                        regExp: ofLocalPropToRemoteSpecifiers,
                        defaultVals: {},
                        dssKeys,
                    },
                    {
                        regExp: toRemoteSpecifiers,
                        defaultVals: {},
                        dssKeys,
                    }
                ]
            },

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