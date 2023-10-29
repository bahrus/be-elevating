import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA, ElevateRule} from './types';
import {register} from 'be-hive/register.js';
import {nudge} from 'trans-render/lib/nudge.js';
import {ElTypes} from 'be-linked/types';

export class BeElevating  extends BE<AP, Actions> implements Actions{
    //TODO use abort controllers, and move off of deprecated getDefaultSignalInfo
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

    async noAttrs(self: this){
        const {enhancedElement} = self;
        //const {getDefaultRemoteRule} = await import('be-linked/getDefaultSignalInfo.js');
        //const elevateRule = getDefaultRemoteRule(enhancedElement);
        const {getRemoteProp} = await import('be-linked/defaults.js');
        const elevateRule: ElevateRule = {
            remoteProp: getRemoteProp(enhancedElement),
            remoteType: '/'
        };
        // const elevateRule: ElevateRule = {
        //     remoteType: '/',
        //     //TODO:  move this evaluation to be-linked -- shared with be-bound
        //     remoteProp: enhancedElement.getAttribute('itemprop') || (enhancedElement as any).name || enhancedElement.id,
        // };
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
            const ab = new AbortController();
            this.#abortControllers.push(ab);
            eventTarget.addEventListener(type, async e => {
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

register(ifWantsToBe, upgrade, tagName);