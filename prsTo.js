import { tryParse } from 'be-enhanced/cpu.js';
//import {strType} from './be-elevating.js';
const remoteProp = String.raw `(?<remoteProp>[\w\-]+)`;
const reToElevatingStatement = [
    {
        regExp: new RegExp(String.raw `^${remoteProp}`),
        defaultVals: {
            remoteType: '/',
        }
    }
];
export function prsTo(self) {
    const { To, to } = self;
    const both = [...(To || []), ...(to || [])];
    const elevateRules = [];
    for (const toStatement of both) {
        const test = tryParse(toStatement, reToElevatingStatement);
        if (test === null)
            throw 'PE';
        elevateRules.push(test);
    }
    return elevateRules;
}
