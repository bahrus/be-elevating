import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
import { nudge } from 'trans-render/lib/nudge.js';
export class BeElevating extends BE {
    #abortControllers = [];
    detach(detachedElement) {
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
                    eventTarget: enhancedElement,
                    type: localEvent,
                };
            }
            else {
                signalInfo = getDefaultSignalInfo(enhancedElement);
            }
            const { eventTarget, type } = signalInfo;
            eventTarget.addEventListener(type, async (e) => {
                let { remoteRef, remoteProp } = rule;
                let ref = remoteRef?.deref();
                if (ref === undefined) {
                    const { remoteType } = rule;
                    const { getRemoteEl } = await import('be-linked/getRemoteEl.js');
                    ref = await getRemoteEl(enhancedElement, remoteType, remoteProp);
                    rule.remoteRef = new WeakRef(ref);
                }
                const { lispToCamel } = await import('trans-render/lib/lispToCamel.js');
                const newRemotePropName = lispToCamel(remoteProp);
                const { getSignalVal } = await import('be-linked/getSignalVal.js');
                ref[newRemotePropName] = getSignalVal(enhancedElement);
            });
        }
        nudge(enhancedElement);
        return {
            resolved: true,
        };
    }
}
function getDefaultSignalInfo(enhancedElement) {
    const { localName } = enhancedElement;
    switch (localName) {
        case 'input':
            return {
                eventTarget: enhancedElement,
                type: 'input'
            };
    }
    throw 'NI';
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
            onCamelized: {
                ifAllOf: ['isParsed'],
                ifAtLeastOneOf: ['of', 'Of']
            },
            hydrate: 'elevateRules'
        }
    }
});
register(ifWantsToBe, upgrade, tagName);
