import dayjs from 'dayjs';

export const formatDate = (dateString: any): string => {
  console.log("dateString::: ", dateString);
  
  return dayjs(dateString).format('DD/MM/YYYY HH:mm:ss');
};