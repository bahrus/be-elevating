import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA, ElevateRule} from './types';
import {register} from 'be-hive/register.js';
import {nudge} from 'trans-render/lib/nudge.js';
import {ElTypes} from 'be-linked/types';

export class BeElevating  extends BE<AP, Actions> implements Actions{
    #abortControllers: Array<AbortController>  = [];
    detach(detachedElement: Element): void {
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
            let signalInfo: SignalInfo | undefined;
            if(localEvent){
                signalInfo = {
                    eventTarget: enhancedElement,
                    type: localEvent,
                }
            }else{
                signalInfo = getDefaultSignalInfo(enhancedElement);
            }
            const {eventTarget, type} = signalInfo;
            eventTarget.addEventListener(type, async e => {
                let {remoteRef, remoteProp} = rule;
                let ref = remoteRef?.deref();
                if(ref === undefined){
                    const {remoteType} = rule;
                    const {getRemoteEl} = await import('be-linked/getRemoteEl.js');
                    ref = await getRemoteEl(enhancedElement, remoteType as ElTypes, remoteProp);
                    rule.remoteRef = new WeakRef(ref);
                }
                const {lispToCamel} = await import('trans-render/lib/lispToCamel.js');
                const newRemotePropName = lispToCamel(remoteProp);
                const {getSignalVal} = await import('be-linked/getSignalVal.js');
                (<any>ref)[newRemotePropName] = getSignalVal(enhancedElement);
            });
        }
        nudge(enhancedElement);
        return {
            resolved: true,
        }
    }
}

//TODO:  move to be-linked
interface SignalInfo{
    eventTarget: EventTarget,
    type: string,
}
function getDefaultSignalInfo(enhancedElement: Element): SignalInfo{
    const {localName} = enhancedElement;
    switch(localName){
        case 'input':
            return {
                eventTarget: enhancedElement,
                type: 'input'
            }
    }
    throw 'NI';
}

export const strType = String.raw `\/|\-`;

export interface BeElevating extends AllProps{}

const tagName = 'be-elevating';
const ifWantsToBe = 'elevating';
const upgrade = '*';

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
            onCamelized: {
                ifAllOf: ['isParsed'],
                ifAtLeastOneOf: ['of', 'Of', 'to', 'To']
            },
            hydrate: 'elevateRules'
        }
    },
    superclass: BeElevating
});

register(ifWantsToBe, upgrade, tagName);