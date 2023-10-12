import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA, ElevateRule} from './types';
import {register} from 'be-hive/register.js';
import {nudge} from 'trans-render/lib/nudge.js';

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
        nudge(enhancedElement);
        return {
            resolved: true,
        }
    }
}

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
                ifAtLeastOneOf: ['of', 'Of']
            },
            hydrate: 'elevateRules'
        }
    }
});

register(ifWantsToBe, upgrade, tagName);