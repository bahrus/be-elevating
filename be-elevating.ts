import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA, ElevateRule} from './types';
import {nudge} from 'trans-render/lib/nudge.js';
import {ElTypes, LocalSignal} from 'be-linked/types';
import {getRemoteProp, getLocalSignal} from 'be-linked/defaults.js';

export class BeElevating  extends BE<AP, Actions> implements Actions{
    #abortControllers: Array<AbortController>  = [];
    detach(): void {
        for(const ac of this.#abortControllers){
            ac.abort();
        }
    }
    static override get beConfig(){
        return {
            parse: true,
            parseAndCamelize: true,
            isParsedProp: 'isParsed'
        } as BEConfig;
    }

    async noAttrs(self: this){
        const {enhancedElement} = self;
        const elevateRule: ElevateRule = {
            remoteProp: getRemoteProp(enhancedElement),
            remoteType: '/'
        };
        return {
          elevateRules: [elevateRule]  
        } 
    }

    async onCamelized(self: this): ProPAP {
        const {of, Of, To, to} = self;
        let ofRules: Array<ElevateRule> = [];
        if((of || Of) !== undefined){
            const {prsOf} = await import('./prsOf.js');
            ofRules = prsOf(self);
        }
        let toRules: Array<ElevateRule> = [];
        if((to || To) !== undefined){
            const {prsTo} = await import('./prsTo.js');
            toRules = prsTo(self);
        }
        const elevateRules = [...ofRules, ...toRules];
        return {
            elevateRules
        };
    }

    async hydrate(self: this){
        const {enhancedElement, elevateRules} = self;
        for(const rule of elevateRules!){
            const {localEvent} = rule;
            let signalInfo: LocalSignal | undefined;
            if(localEvent){
                signalInfo = {
                    signal: enhancedElement,
                    type: localEvent,
                }
            }else{
                signalInfo = await getLocalSignal(enhancedElement);
            }
            const {signal, type} = signalInfo!;
            const ab = new AbortController();
            this.#abortControllers.push(ab);
            signal.addEventListener(type, async e => {
                let {remoteRef, remoteProp, localProp} = rule;
                let ref = remoteRef?.deref();
                if(ref === undefined){
                    const {remoteType} = rule;
                    const {getRemoteEl} = await import('be-linked/getRemoteEl.js');
                    ref = await getRemoteEl(enhancedElement, remoteType as ElTypes, remoteProp);
                    rule.remoteRef = new WeakRef(ref);
                }
                const {lispToCamel} = await import('trans-render/lib/lispToCamel.js');
                let val: any;
                if(localProp === undefined){
                    const {getSignalVal} = await import('be-linked/getSignalVal.js');
                    val = getSignalVal(enhancedElement);
                }else{
                    if(localProp[0] === '.'){
                        const {getVal} = await import('trans-render/lib/getVal.js');
                        val = await getVal({host: enhancedElement}, localProp);
                    }else{
                        val = (<any>enhancedElement)[localProp];
                    }
                }
                const newRemotePropName = lispToCamel(remoteProp);
                (<any>ref)[newRemotePropName] = val;
            }, {signal: ab.signal});
        }
        nudge(enhancedElement);
        return {
            resolved: true,
        }
    }
}


export const strType = String.raw `\/|\-`;

export interface BeElevating extends AllProps{}

export const tagName = 'be-elevating';


const xe = new XE<AP, Actions>({
    config:{
        tagName,
        isEnh: true,
        propDefaults: {
            ...propDefaults,
        },
        propInfo: {
            ...propInfo
        },
        actions:{
            noAttrs: {
                ifAllOf: ['isParsed'],
                ifNoneOf: ['of', 'Of', 'to', 'To']
            },
            onCamelized: {
                ifAllOf: ['isParsed'],
                ifAtLeastOneOf: ['of', 'Of', 'to', 'To']
            },
            hydrate: 'elevateRules'
        }
    },
    superclass: BeElevating
});
