// @ts-check
import { propInfo, rejected, resolved } from 'be-enhanced/cc.js';
import { BE } from 'be-enhanced/BE.js';
import { stdProp } from 'trans-render/asmr/stdProp.js';
import { parse } from 'trans-render/dss/parse.js';
import { ASMR } from 'trans-render/asmr/asmr.js';
import { find } from 'trans-render/dss/find.js';
import {dispatchEvent as de} from 'trans-render/positractions/dispatchEvent.js';
/** @import {BEConfig, IEnhancement, BEAllProps} from './ts-refs/be-enhanced/types.d.ts' */
/** @import {Actions, PAP, AllProps, AP, BAP, Binding} from './ts-refs/be-elevating/types.d.ts' */;
/** @import {AbsorbingObject, SharingObject} from './ts-refs/trans-render/asmr/types' */

/**
 * @implements {Actions}
 * 
 */
class BeElevating extends BE {

    /**
     * @type {BEConfig<BAP, Actions & IEnhancement>}
     */
    static config = {
        propInfo: {
            ...propInfo,
            bindings: {},
            bindingRules: {},
            rawStatements: {},
        },
        compacts:{
            when_bindingRules_changes_invoke_getBindings: 0,
            when_bindings_changes_invoke_hydrate: 0,
            when_rawStatements_changes_invoke_onRawStatements: 0,
        },
        actions: {
            noAttrs: {
                ifNoneOf: ['bindingRules'],
            }
        },
        positractions: [resolved, rejected],
    };

    de = de;
    /**
     * 
     * @param {BAP} self 
     * @returns 
     */
    async noAttrs(self) {
        //copied from be-bound
        const { enhancedElement } = self;
        const remoteProp = stdProp(enhancedElement);
        const remoteSpecifier = await parse(`/${remoteProp}`);
        const remoteEl = await find(enhancedElement, remoteSpecifier);
        if(remoteEl === null) throw 404;
        const remoteShareObj = await ASMR.getSO(remoteEl, {
            valueProp: remoteProp
        });
        const localAbsObj = await ASMR.getAO(enhancedElement);
        
        return /** type {PAP} */ ({
            bindings: [
                {remoteShareObj, localAbsObj}
            ]
        });
    }

    /**
     * 
     * @param {AbsorbingObject} localAbsObj 
     * @param {SharingObject} remoteShareObj 
     */
    addLocalAbs(localAbsObj, remoteShareObj){
        localAbsObj.addEventListener('.', async (e) => {
            const val = await localAbsObj.getValue();
            remoteShareObj.setValue(val);
        });
    }


    /**
     * 
     * @param {BAP} self 
     * @returns 
     */
    async hydrate(self){
        const { bindings, enhancedElement } = self;
        for (const binding of bindings) {
            const {remoteShareObj, localAbsObj} = binding;
            this.addLocalAbs(localAbsObj, remoteShareObj);
        }
        const { nudge } = await import('trans-render/lib/nudge.js');
        nudge(enhancedElement);
        return /** type {PAP} */ ({
            resolved: true
        });
    }

    /**
     * 
     * @param {BAP} self 
     * @returns 
     */
    async getBindings(self){
        const {bindingRules, enhancedElement} = self;
        const bindings = /** @type {Array<Binding>} */ [];
        for (const bindingRule of bindingRules) {
            let {remoteSpecifier, localPropToElevate} = bindingRule;
            let remoteProp;
            let remoteEvtName;
            //copied from be-bound
            if (remoteSpecifier === undefined) {
                remoteProp = stdProp(enhancedElement);
                remoteSpecifier = await parse(`/${remoteProp}`);
            }else{
                const { s, prop } = remoteSpecifier;
                switch (s) {
                    case '/':
                    case '-':
                        remoteProp = prop;
                        break;
                }
                remoteEvtName = remoteSpecifier.evt;
            }
            const remoteEl = await find(enhancedElement, remoteSpecifier);
            if(remoteEl === null) throw 404;
            const remoteShareObj = await ASMR.getSO(remoteEl, {
                valueProp: remoteProp
            });
            //console.log({localPropToElevate});
            const localAbsObj = await ASMR.getAO(enhancedElement, {propToAbsorb: localPropToElevate});
            bindings.push({remoteShareObj, localAbsObj});
        }
        return /** type {PAP} */ ({
            bindings
        });
    }

    /**
     * 
     * @param {BAP} self 
     */
    onRawStatements(self){
        const { rawStatements } = self;
        console.error('The following statements could not be parsed.', rawStatements);
    }
}

await BeElevating.bootUp();
export { BeElevating };