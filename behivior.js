import { BeHive, seed, MountObserver } from 'be-hive/be-hive.js';
const dssKeys = [['dependencyPart', 'remoteSpecifiers[]']];
const dependencyPart = String.raw `(?<dependencyPart>.*)`;
const toRemoteSpecifiers = String.raw `^(t|T)o ${dependencyPart}`;
const ofLocalPropToRemoteSpecifiers = String.raw `^(o|O)f (?<localPropToElevate>[\w\:\$\+]+) to ${dependencyPart}`;
export const emc = {
    base: 'be-elevating',
    map: {
        '0.0': {
            instanceOf: 'Object$entences',
            objValMapsTo: '.',
            regExpExts: {
                parsedStatements: [
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
        const { BeElevating } = await import('./be-elevating.js');
        return BeElevating;
    }
};
const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);
