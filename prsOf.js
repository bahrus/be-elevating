import { tryParse } from 'be-enhanced/cpu.js';
//import {strType} from './be-elevating.js';
const toRemoteProp = String.raw `(?<!\\)To(?<remoteProp>[\w\-]+)`;
const localProp = String.raw `(?<localProp>[\w]+)`;
const onLocalEvent = String.raw `(?<!\\)On(?<localEvent>[\w]+)`;
const reOfElevatingStatement = [
    {
        regExp: new RegExp(String.raw `^${localProp}${toRemoteProp}${onLocalEvent}`),
        defaultVals: {
            remoteType: '/'
        }
    }
];
export function prsOf(self) {
    const { Of, of } = self;
    const both = [...(Of || []), ...(of || [])];
    const elevateRules = [];
    for (const ofStatement of both) {
        const test = tryParse(ofStatement, reOfElevatingStatement);
        if (test === null)
            throw 'PE';
        elevateRules.push(test);
    }
    return elevateRules;
}
