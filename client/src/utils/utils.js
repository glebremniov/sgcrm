export const joinClassNames = (...classNames) => classNames.join(' ');
export const formatDate = date => new Date(date).toLocaleDateString();
export const getISODateString = (date = new Date()) => date.toISOString().split('T')[0]