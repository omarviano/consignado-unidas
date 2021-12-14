export const AUTH_PERSIST_KEY = '@UserInfo:persist';

export const SESSION_KEY = '@SESSION';

export const DATA_MARGIN_KEY = '@DATA_MARGIN_KEY';

export const DATA_SIMULATE_LOAN_KEY = '@DATA_SIMULATE_LOAN';

export const VALUE_SLIDER_KEY = '@VALUE_SLIDER';

export const ACCEPTED_COOKIES = '@ACCEPTED_COOKIES';

const DATA_THAT_CAN_BE_CLEANED = [
  AUTH_PERSIST_KEY,
  SESSION_KEY,
  DATA_MARGIN_KEY,
  DATA_SIMULATE_LOAN_KEY,
  VALUE_SLIDER_KEY,
];

export const clearStorage = () => {
  DATA_THAT_CAN_BE_CLEANED.forEach(item => {
    localStorage.removeItem(item);
  });
};
