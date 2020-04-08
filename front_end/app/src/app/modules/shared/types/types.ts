// views mod
export type TViewMode = 'list' | 'cards';

// for home's list sorting
export type THomesSortingMethod = 'HOME_UP' | 'HOME_DOWN' | 'STREET_UP' | 'STREET_DOWN' |
'CITY_UP' | 'CITY_DOWN' | 'STATE_UP' | 'STATE_DOWN' | 'PRICE_UP' | 'PRICE_DOWN' | 'DATE_UP' | 'DATE_DOWN' ;
export type THomesSortingField = 'HOME' | 'STREET' | 'CITY' | 'STATE' | 'PRICE' | 'DATE';

// for client's list sorting
export type TClientsSortingMethod = 'NAME_UP' | 'NAME_DOWN' | 'SURNAME_UP' | 'SURNAME_DOWN';
export type TClientsSortingField = 'NAME' | 'SURNAME';

// for deal's list sorting
export type TDealsSortingMethod = 'CLIENT_UP' | 'CLIENT_DOWN' | 'HOME_UP' | 'HOME_UP' |
'PRICE_UP' | 'PRICE_DOWN' | 'DATE_UP' | 'DATE_DOWN';
export type TDealsSortingField = 'CLIENT' | 'HOME' | 'DATE' | 'PRICE';
