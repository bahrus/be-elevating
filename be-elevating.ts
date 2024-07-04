import {config as beCnfg} from 'be-enhanced/config.js';
import {BE, BEConfig} from 'be-enhanced/BE.js';
import {Actions, AllProps, AP,  ElevatingParameters,  PAP} from './types';
import {IEnhancement,  BEAllProps, EnhancementInfo, EMC} from 'trans-render/be/types';
import { Specifier } from 'trans-render/dss/types';
import {dispatchEvent as de} from 'trans-render/positractions/dispatchEvent.js';

class BeElevating extends BE implements Actions {
    de = de;
    static override config: BEConfig<AP & BEAllProps, Actions & IEnhancement, any> = {
        propInfo: {
            ...beCnfg.propInfo,
            parsedStatements: {},
            rawStatements: {},
        },
        actions: {
            noAttrs: {
                ifNoneOf: ['parsedStatements']
            },
            hydrate: {
                ifAllOf: ['parsedStatements']
            },
            onRawStatements: {
                ifAllOf: ['rawStatements']
            }
        },
        positractions: [...beCnfg.positractions!]
    }

    async noAttrs(self: this){
        const {enhancedElement} = self;
        const {getRemoteProp} = await import('be-linked/defaults.js');
        const specifier: Specifier = {
            s: '/',
            elS: '*',
            dss: '^',
            scopeS: '[itemscope]',
            rec: true,
            rnf: true,
            prop: getRemoteProp(enhancedElement),
            host: true
        }
        const parsedStatement : ElevatingParameters = {
            remoteSpecifiers: [specifier]
        }
        return {
            parsedStatements: [parsedStatement]
        } as PAP;
    }

    #abortControllers: AbortController[] = [];

    async hydrate(self: this){
        const {parsedStatements, enhancedElement} = self;
        console.log({parsedStatements});
        const {nudge} = await import('trans-render/lib/nudge.js');
        for(const parsedStatement of parsedStatements!){
            let {localEventType, localPropToElevate} = parsedStatement;
            let et = enhancedElement;
            if(localEventType === undefined || localPropToElevate === undefined){
                const {getLocalSignal} = await import('be-linked/defaults.js');
                const ls = await getLocalSignal(enhancedElement);
                const {signal, prop, type, subProp} = ls;
                if(localEventType === undefined) localEventType = type;
                if(localPropToElevate === undefined) localPropToElevate = prop;
                
                
                console.log({signal});
            }
            const ac = new AbortController();
            this.#abortControllers.push(ac);
            et.addEventListener(localEventType, async e => {
                const {remoteSpecifiers} = parsedStatement;
                const {find} = await import('trans-render/dss/find.js');
                for(const remoteSpecifier of remoteSpecifiers){
                    const remoteET = await find(enhancedElement, remoteSpecifier);
                    let val: any;
                    //TODO:  maybe be-hive should have a special way of mapping this?
                    if(localPropToElevate![0] === ':'){
                        const {getVal} = await import('trans-render/lib/getVal.js');
                        val = await getVal({host: enhancedElement}, localPropToElevate!.replaceAll(':', '.'));
                    }else{
                        val = (<any>enhancedElement)[localPropToElevate!];
                    }
                    const {prop} = remoteSpecifier;
                    (<any>remoteET)[prop!] = val;
                    console.log({remoteSpecifier, remoteET, val});
                }
            }, {signal: ac.signal});
            console.log({localEventType, et, localPropToElevate})
        }
        nudge(enhancedElement);
        return {
            resolved: true
        } as PAP;
    }

    onRawStatements(self: this) {
        const {rawStatements} = self;
        console.error(400, rawStatements);
    }
}

interface BeElevating extends AP{}

await BeElevating.bootUp();

export {BeElevating}