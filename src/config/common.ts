import dayjs from 'dayjs';

export const formatDate = (dateString: any): string => {
  return dayjs(dateString).format('DD/MM/YYYY HH:mm:ss');
};