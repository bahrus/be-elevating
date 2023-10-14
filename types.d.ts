import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE} from 'be-enhanced/types';

export interface EndUserProps extends IBE{
    of?: Array<OfStatement>,
    Of?: Array<OfStatement>,
    to?: Array<ToStatement>,
    To?: Array<ToStatement>,
}

export interface AllProps extends EndUserProps{
    isParsed?: boolean,
    elevateRules?: Array<ElevateRule>,
}

export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>];

export interface Actions{
    onCamelized(self: this): ProPAP;
    hydrate(self: this): ProPAP;
    noAttrs(self: this): ProPAP;
}


export type OfStatement = string;
export type ToStatement = string;

export type ElTypes = '/' | '-';

export interface ElevateRule{
    localEvent?: string,
    localProp?: string,
    remoteProp: string,
    remoteType: ElTypes,
    remoteRef?: WeakRef<Element>,
}