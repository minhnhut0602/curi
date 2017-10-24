import { HickoryLocation } from '@hickory/root';
import { Route } from './createRoute';
import { AnyResponse } from './createResponse';

export type AddonRegister = (route: Route, parent?: any) => any;
export type AddonGet = (name: string, ...rest: Array<any>) => any;

export interface Addon {
  name: string;
  register: AddonRegister;
  get: AddonGet;
  reset(): void;
}

export type Subscriber = (response: AnyResponse, action?: string) => void;
export interface SideEffect {
  fn: Subscriber;
  after?: boolean;
}
export type UnsubscribeFn = () => void;

export interface Cache {
  set: (response: AnyResponse) => void;
  get: (location: HickoryLocation) => AnyResponse;
}

export type RawParams = { [key: string]: string };
export type Params = { [key: string]: any };