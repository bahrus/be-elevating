import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE} from 'be-enhanced/types';

export interface EndUserProps extends IBE{
    of?: Array<OfStatement>,
    Of?: Array<OfStatement>,
    to?: Array<ToStatement>,
    To?: Array<ToStatement>,
}

export type OfStatement = string;
export type ToStatement = string;

export type ElTypes = '/' | '-';

export interface ElevateRule{
    localEvent?: string,
    remoteProp: string,
    remoteType: ElTypes,
    remoteRef?: WeakRef<Element>,
}