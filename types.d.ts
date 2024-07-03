import {IEnhancement} from 'trans-render/be/types';
import {Target, Scope, ProxyPropChangeInfo} from 'trans-render/lib/types';
import { Specifier } from 'trans-render/dss/types';

export interface EndUserProps extends IEnhancement{

}

export interface AP extends EndUserProps {
    parsedStatements?: Array<ElevatingParameters>,
    rawStatements?: Array<string>,
}

export type AllProps = AP;

export type PAP = Partial<AP>

export type ProPAP  = Promise<PAP>

export interface Actions{

}

export interface ElevatingParameters {
    localPropToElevate?: string,
    remoteSpecifiers: Array<Specifier>,
    localEventType?: string,
}