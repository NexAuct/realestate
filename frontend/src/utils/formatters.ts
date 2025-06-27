import { CURRENCY_FORMAT } from './constants';

export const formatCurrency = (amount: number, locale = 'en-MY') => {
  return new Intl.NumberFormat(locale, CURRENCY_FORMAT).format(amount);
};

export const formatDate = (date: string | Date, locale = 'en-MY') => {
  return new Date(date).toLocaleDateString(locale);
};

export const formatNumber = (num: number, locale = 'en-MY') => {
  return new Intl.NumberFormat(locale).format(num);
};

export const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};