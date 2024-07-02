import {AP, ProPAP, PAP, ElevateRule} from './types';
import {ElTypes} from 'be-linked/types';
import {RegExpOrRegExpExt} from 'be-enhanced/types';
import {arr, tryParse} from 'be-enhanced/cpu.js';
import {strType} from './be-elevating.js';

const remoteProp = String.raw `(?<remoteProp>[\w\-]+)`;

const remoteType = String.raw `(?<remoteType>${strType})`;

const onLocalEvent = String.raw `(?<!\\)On(?<localEvent>[\w]+)`;

const reToElevatingStatement: Array<RegExpOrRegExpExt<Partial<ElevateRule>>> = [
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

export function prsTo(self: AP) : Array<ElevateRule> {
    const {To, to} = self;
    const both = [...(To || []), ...(to || [])];
    const elevateRules: Array<ElevateRule> = [];
    for(const toStatement of both){
        const test = tryParse(toStatement, reToElevatingStatement) as ElevateRule;
        if(test === null) throw 'PE';
        elevateRules.push(test);
    }
    return elevateRules;
}