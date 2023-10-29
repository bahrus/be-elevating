import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
import { nudge } from 'trans-render/lib/nudge.js';
import { getRemoteProp, getLocalSignal } from 'be-linked/defaults.js';
export class BeElevating extends BE {
    #abortControllers = [];
    detach() {
        for (const ac of this.#abortControllers) {
            ac.abort();
        }
    }
    static get beConfig() {
        return {
            parse: true,
            parseAndCamelize: true,
            isParsedProp: 'isParsed'
        };
    }
    async noAttrs(self) {
        const { enhancedElement } = self;
        const elevateRule = {
            remoteProp: getRemoteProp(enhancedElement),
            remoteType: '/'
        };
        return {
            elevateRules: [elevateRule]
        };
    }
    async onCamelized(self) {
        const { of, Of, To, to } = self;
        let ofRules = [];
        if ((of || Of) !== undefined) {
            const { prsOf } = await import('./prsOf.js');
            ofRules = prsOf(self);
        }
        let toRules = [];
        if ((to || To) !== undefined) {
            const { prsTo } = await import('./prsTo.js');
            toRules = prsTo(self);
        }
        const elevateRules = [...ofRules, ...toRules];
        return {
            elevateRules
        };
    }
    async hydrate(self) {
        const { enhancedElement, elevateRules } = self;
        for (const rule of elevateRules) {
            const { localEvent } = rule;
            let signalInfo;
            if (localEvent) {
                signalInfo = {
                    signal: enhancedElement,
                    type: localEvent,
                };
            }
            else {
                signalInfo = await getLocalSignal(enhancedElement);
            }
            const { signal, type } = signalInfo;
            const ab = new AbortController();
            this.#abortControllers.push(ab);
            signal.addEventListener(type, async (e) => {
                let { remoteRef, remoteProp, localProp } = rule;
                let ref = remoteRef?.deref();
                if (ref === undefined) {
                    const { remoteType } = rule;
                    const { getRemoteEl } = await import('be-linked/getRemoteEl.js');
                    ref = await getRemoteEl(enhancedElement, remoteType, remoteProp);
                    rule.remoteRef = new WeakRef(ref);
                }
                const { lispToCamel } = await import('trans-render/lib/lispToCamel.js');
                let val;
                if (localProp === undefined) {
                    const { getSignalVal } = await import('be-linked/getSignalVal.js');
                    val = getSignalVal(enhancedElement);
                }
                else {
                    if (localProp[0] === '.') {
                        const { getVal } = await import('trans-render/lib/getVal.js');
                        val = await getVal({ host: enhancedElement }, localProp);
                    }
                    else {
                        val = enhancedElement[localProp];
                    }
                }
                const newRemotePropName = lispToCamel(remoteProp);
                ref[newRemotePropName] = val;
            }, { signal: ab.signal });
        }
        nudge(enhancedElement);
        return {
            resolved: true,
        };
    }
}
export const strType = String.raw `\/|\-`;
const tagName = 'be-elevating';
const ifWantsToBe = 'elevating';
const upgrade = '*';
const xe = new XE({
    config: {
        tagName,
        isEnh: true,
        propDefaults: {
            ...propDefaults,
        },
        propInfo: {
            ...propInfo
        },
        actions: {
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
