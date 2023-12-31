import { tryParse } from 'be-enhanced/cpu.js';
import { strType } from './be-elevating.js';
const remoteProp = String.raw `(?<remoteProp>[\w\-]+)`;
const remoteType = String.raw `(?<remoteType>${strType})`;
const onLocalEvent = String.raw `(?<!\\)On(?<localEvent>[\w]+)`;
const reToElevatingStatement = [
    {
        regExp: new RegExp(String.raw `^${remoteType}${remoteProp}${onLocalEvent}`),
        defaultVals: {}
    },
    {
        regExp: new RegExp(String.raw `^${remoteProp}${onLocalEvent}`),
        defaultVals: {
            remoteType: '/',
        }
    },
    {
        regExp: new RegExp(String.raw `^${remoteType}${remoteProp}`),
        defaultVals: {}
    },
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
