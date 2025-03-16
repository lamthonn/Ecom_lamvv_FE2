import { FunctionComponent, useEffect, useState } from "react";
import { ConfigProvider, DatePicker, Form, Typography } from "antd";
import { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/vi';
import viVN from "antd/lib/locale/vi_VN";
import ShowToast from "../show-toast/ShowToast";

dayjs.locale('vi');

type DatePickerComponentProps = {
    label?: string;
    placeholder?: string;
    placeholderRange?: string[];
    value?: Dayjs | [Dayjs, Dayjs] | null; // Single or Range date picker value
    onChange?: DatePickerProps["onChange"] | RangePickerProps["onChange"]; // Change handler for single or range
    disabled?: boolean;
    style?: any;
    format?: string; // Date format (e.g., "YYYY-MM-DD")
    picker?: "week" | "month" | "quarter" | "year";
    mode?: "date" | "range"; // Mode for date or range selection
    allowClear?: boolean;
    defaultValue?: Dayjs;
    limit?: number | null;
    onlyDate?: boolean;
};

const { RangePicker } = DatePicker;

const DatePickerCustomOld: FunctionComponent<DatePickerComponentProps> = ({
    label,
    placeholder,
    placeholderRange = ["Bắt đầu", "Kết thúc"],
    value,
    onChange,
    disabled,
    style,
    format = "DD/MM/YYYY", // Default format
    mode = "date", // Default to single date picker
    allowClear = true,
    defaultValue,
    limit,
    onlyDate = true,
    picker,
    ...rest
}) => {

    placeholderRange = ["Bắt đầu", "Kết thúc"];
    const onCalendarChange = (dates: any, dateStrings: any, info: any) => {
        debugger
        if (dates && dates[0] && dates[1]) {
          // Chỉ lưu khi cả start và end đều đã chọn
          const updatedDates = [
            dates[0],
            dates[1],
          ];
          const [start, end] = updatedDates;
      
          if (limit && end.diff(start, 'day') > limit) {
            ShowToast('error', `Thông báo`, `Khoảng thời gian tối đa có thể chọn là ${limit} ngày`, 6);
          } else {
            
            onChange?.(dates, [start.format(format), end.format(format)]);
          }
        }
      }

    const onRangeChange = (dates: any) => {
        debugger
        if (dates) {
            const [start, end] = dates;
            const diff = end.diff(start, 'day'); // Tính số ngày



            if (picker === undefined) {
                if (limit && diff > limit) {
                    ShowToast('error', `Có lỗi xảy ra`, `Khoảng thời gian tối đa có thể chọn là ${limit} ngày`, 6);
                    onChange?.(start, [start, start])
                }
                else {
                    if (onChange) {
                        try {
                            onChange(dates, [start.format(format).add(7, 'hour'), end.format(format).add(7, 'hour')]);
                        }
                        catch {
                            onChange(dates, [start.format(format), end.format(format)]);
                        }
                    }
                }
            }
            else {
                if (onChange) {
                    try {
                        onChange(dates, [start.format(format).add(7, 'hour'), end.format(format).add(7, 'hour')]);
                    }
                    catch {
                        onChange(dates, [start.format(format), end.format(format)]);
                    }
                }
            }


        }
        else {
            if (onChange) {
                onChange(null as any, null as any); // Set null nếu không có dates
            }
            else {
                ShowToast('error', `Có lỗi xảy ra`, `Giá trị không hợp lệ`, 6)
            }
        }
    }

    return (
        <ConfigProvider locale={viVN}>
            {label && <Typography.Text style={{ fontSize: '16px' }}>{label}</Typography.Text>}
            {mode === "range" ? (
                <RangePicker
                    placeholder={[placeholderRange[0], placeholderRange[1]]}
                    value={value as [Dayjs, Dayjs]}
                    onChange={onRangeChange}
                    disabled={disabled}
                    onCalendarChange={onCalendarChange}
                    style={style}
                    format={format}
                    showTime={onlyDate ? false : { format: 'HH' }}
                    allowClear={allowClear}
                    picker={picker}
                />
            ) : (
                <DatePicker
                    placeholder={placeholder ?? placeholderRange[0]}
                    value={value as Dayjs}
                    onChange={onChange as DatePickerProps["onChange"]}
                    disabled={disabled}
                    defaultValue={defaultValue}
                    style={style}
                    format={format}
                    showTime={onlyDate ? false : {
                        format: 'HH', // Chỉ hiển thị giờ
                        hourStep: 1, // Bước nhảy của giờ (có thể thay đổi nếu cần)
                    }}
                    allowClear={allowClear}
                    picker={picker}
                //{...rest} // loi die page
                />
            )}
        </ConfigProvider>
    );
};

export default DatePickerCustomOld;
