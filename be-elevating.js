import { config as beCnfg } from 'be-enhanced/config.js';
import { BE } from 'be-enhanced/BE.js';
import { dispatchEvent as de } from 'trans-render/positractions/dispatchEvent.js';
class BeElevating extends BE {
    de = de;
    static config = {
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
            }
        },
        positractions: [...beCnfg.positractions]
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
    #abortControllers = [];
    async hydrate(self) {
        const { parsedStatements, enhancedElement } = self;
        console.log({ parsedStatements });
        const { nudge } = await import('trans-render/lib/nudge.js');
        for (const parsedStatement of parsedStatements) {
            let { localEventType, localPropToElevate } = parsedStatement;
            let et = enhancedElement;
            if (localEventType === undefined || localPropToElevate === undefined) {
                const { getLocalSignal } = await import('be-linked/defaults.js');
                const ls = await getLocalSignal(enhancedElement);
                const { signal, prop, type, subProp } = ls;
                if (localEventType === undefined)
                    localEventType = type;
                if (localPropToElevate === undefined)
                    localPropToElevate = prop;
                console.log({ signal });
            }
            const ac = new AbortController();
            this.#abortControllers.push(ac);
            et.addEventListener(localEventType, async (e) => {
                const { remoteSpecifiers } = parsedStatement;
                const { find } = await import('trans-render/dss/find.js');
                for (const remoteSpecifier of remoteSpecifiers) {
                    const remoteET = await find(enhancedElement, remoteSpecifier);
                    const val = enhancedElement[localPropToElevate];
                    const { prop } = remoteSpecifier;
                    remoteET[prop] = val;
                    console.log({ remoteSpecifier, remoteET, val });
                }
            }, { signal: ac.signal });
            console.log({ localEventType, et, localPropToElevate });
        }
        nudge(enhancedElement);
        return {
            resolved: true
        };
    }
    onRawStatements(self) {
        const { rawStatements } = self;
        console.error(400, rawStatements);
    }
}
await BeElevating.bootUp();
export { BeElevating };
