import {AP, ProPAP, PAP, ElevateRule} from './types';
import {ElTypes} from 'be-linked/types';
import {RegExpOrRegExpExt} from 'be-enhanced/types';
import {arr, tryParse} from 'be-enhanced/cpu.js';
//import {strType} from './be-elevating.js';

const toRemoteProp = String.raw `(?<!\\)To(?<remoteProp>[\w\-]+)`;
const localProp = String.raw `(?<localProp>[\w]+)`;
const onLocalEvent = String.raw `(?<!\\)On(?<localEvent>[\w]+)`;

const reOfElevatingStatement: Array<RegExpOrRegExpExt<Partial<ElevateRule>>> = [
    {
        regExp: new RegExp(String.raw `^${localProp}${toRemoteProp}${onLocalEvent}`),
        defaultVals: {
            remoteType: '/'
        }
    }
];

export function prsOf(self: AP) : Array<ElevateRule> {
    const {Of, of} = self;
    const both = [...(Of || []), ...(of || [])];
    const elevateRules: Array<ElevateRule> = [];
    for(const ofStatement of both){
        const test = tryParse(ofStatement, reOfElevatingStatement);
        if(test === null) throw 'PE';
        elevateRules.push(test);
    }
    return elevateRules;
}