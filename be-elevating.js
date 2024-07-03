import { config as beCnfg } from 'be-enhanced/config.js';
import { BE } from 'be-enhanced/BE.js';
class BeElevating extends BE {
    static config = {
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
    };
    async noAttrs(self) {
        const { enhancedElement } = self;
        const { getRemoteProp } = await import('be-linked/defaults.js');
        const specifier = {
            s: '/',
            elS: '*',
            dss: '^',
            scopeS: '[itemscope]',
            rec: true,
            rnf: true,
            prop: getRemoteProp(enhancedElement),
            host: true
        };
        const parsedStatement = {
            remoteSpecifiers: [specifier]
        };
        return {
            parsedStatements: [parsedStatement]
        };
    }
}
await BeElevating.bootUp();
export { BeElevating };
