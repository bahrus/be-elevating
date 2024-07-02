import {AP, ProPAP, PAP, ElevateRule} from './types';
import {ElTypes} from 'be-linked/types';
import {RegExpOrRegExpExt} from 'be-enhanced/types';
import {arr, tryParse} from 'be-enhanced/cpu.js';
import {lispToCamel} from 'trans-render/lib/lispToCamel.js';
//import {strType} from './be-elevating.js';

const toRemoteProp = String.raw `(?<!\\)To(?<remoteProp>[\w\-]+)`;
const localProp = String.raw `(?<localProp>[\w\:]+)`;
const onLocalEvent = String.raw `(?<!\\)On(?<localEvent>[\w]+)`;

const reOfElevatingStatement: Array<RegExpOrRegExpExt<Partial<ElevateRule>>> = [
    {
        regExp: new RegExp(String.raw `^${localProp}${toRemoteProp}${onLocalEvent}`),
        defaultVals: {
            remoteType: '/'
        }
    },
    {
        regExp: new RegExp(String.raw `^${localProp}${toRemoteProp}`),
        defaultVals: {
            remoteType: '/'
        }
    },
];

export function prsOf(self: AP) : Array<ElevateRule> {
    const {Of, of} = self;
    const both = [...(Of || []), ...(of || [])];
    const elevateRules: Array<ElevateRule> = [];
    for(const ofStatement of both){
        const test = tryParse(ofStatement, reOfElevatingStatement) as ElevateRule;
        if(test === null) throw 'PE';
        const {localProp, remoteProp} = test;
        if(localProp !== undefined && localProp.includes(':')) test.localProp = '.' + localProp.replaceAll(':', '.');
        //if(remoteProp !== undefined && remoteProp.includes('-')) test.remoteProp = lispToCamel(remoteProp);
        elevateRules.push(test);
    }
    return elevateRules;
}