// @ts-check
import { config as beCnfg } from 'be-enhanced/config.js';
import { BE } from 'be-enhanced/BE.js';
import { stdProp } from 'trans-render/asmr/stdProp.js';
import { parse } from 'trans-render/dss/parse.js';
import { ASMR } from 'trans-render/asmr/asmr.js';
import { find } from 'trans-render/dss/find.js';
/** @import {BEConfig, IEnhancement, BEAllProps} from './ts-refs/be-enhanced/types.d.ts' */
/** @import {Actions, PAP, AllProps, AP, BAP, Binding} from './ts-refs/be-elevating/types.d.ts' */;
/** @import {AbsorbingObject, SharingObject} from './ts-refs/trans-render/asmr/types' */

/**
 * @implements {Actions}
 * 
 */
class BeElevating extends BE {
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
}

await BeElevating.bootUp();
export { BeElevating };