import { Client } from '../../clients/model/client';
import { Home } from '../../homes/model/home';
import { User } from '../../user/model/user';

// views mod
export type TViewMode = keyof {
    list: string,
    cards: string
};

// for home's list sorting
export type THomesSortingMethod = 'home_asc' | 'home_desc' | 'street_asc' | 'street_desc' |
'city_asc' | 'city_desc' | 'state_asc' | 'state_desc' | 'price_asc' | 'price_desc';
export type THomesSortingField = 'home' | 'street' | 'city' | 'state' | 'price';

// for client's list sorting
export type TClientsSortingMethod = 'name_asc' | 'name_desc' | 'surname_asc' | 'surname_desc';
export type TClientsSortingField = 'name' | 'surname';

export interface ISortingConf {
  active: THomesSortingField | TClientsSortingField | TDealsSortingField;
  direction: 'asc' | 'desc';
}

// for deal's list sorting
export type TDealsSortingMethod = 'price_asc' | 'price_desc' | 'date_asc' | 'date_desc';
export type TDealsSortingField = 'date' | 'price';

export interface TMessage {
    text: string;
    status: TMessageStatus;
  }

type TMessageStatus = 'error' | 'warn' | 'info';

export interface IPopupQuestionConf {
  title: string;
  content: string;
  client?: Client;
  home?: Home;
  user?: User;
}

export interface IPopupHomesSelectorConf {
  title: string;
  client: Client;
}

export interface IPopupClientsSelectorConf {
  title: string;
  home: Home;
}
