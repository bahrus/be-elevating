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
     * @param {BAP} self 
     * @returns 
     */
    async hydrate(self){
        const { nudge } = await import('trans-render/lib/nudge.js');
        return /** type {PAP} */ ({
            resolved: true
        });
    }
}

await BeElevating.bootUp();
export { BeElevating };