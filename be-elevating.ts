import {config as beCnfg} from 'be-enhanced/config.js';
import {BE, BEConfig} from 'be-enhanced/BE.js';
import {Actions, AllProps, AP,  ElevatingParameters,  PAP} from './types';
import {IEnhancement,  BEAllProps, EnhancementInfo, EMC} from 'trans-render/be/types';
import { Specifier } from 'trans-render/dss/types';

class BeElevating extends BE implements Actions {
    static override config: BEConfig<AP & BEAllProps, Actions & IEnhancement, any> = {
        propInfo: {
            ...beCnfg.propInfo,
            parsedStatements: {},
            rawStatements: {},
        },
        actions: {
            noAttrs: {
                ifNoneOf: ['parsedStatements']
            }
        }
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
}

interface BeElevating extends AP{}

await BeElevating.bootUp();

export {BeElevating}