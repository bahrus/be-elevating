import { BeHive, seed, MountObserver } from 'be-hive/be-hive.js';
const dssKeys = [['dependencyPart', 'remoteSpecifiers[]']];
const dependencyPart = String.raw `(?<dependencyPart>.*)`;
const toRemoteSpecifiers = String.raw `^(t|T)o ${dependencyPart}`;
const ofLocalPropToRemoteSpecifiers = String.raw `^(o|O)f (?<localPropToElevate>[\w\:\$\+]+) to ${dependencyPart}`;
const onLocalEventType = String.raw ` on (?<localEventType>.*)`;
const ofLocalPropToRemoteSpecifiersOnLocalEventType = String.raw `${ofLocalPropToRemoteSpecifiers}${onLocalEventType}`;
const toRemoteSpecifiersOnLocalEventType = String.raw `${toRemoteSpecifiers}${onLocalEventType}`;
export const emc = {
    base: 'be-elevating',
    branches: ['', 'pass-srv'],
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
