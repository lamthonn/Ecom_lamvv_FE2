import dayjs from 'dayjs';

export const formatDate = (dateString: any): string => {
  return dateString ? dayjs(dateString).format('DD/MM/YYYY HH:mm:ss') : "";
};