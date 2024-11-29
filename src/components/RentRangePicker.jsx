import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";

export default function RentRangePicker({ initialDatesRange, setDatesRange }) {
  return (
    <LocalizationProvider  dateAdapter={AdapterDayjs}>
      <DateRangePicker className="datepicker"
        slots={{ field: SingleInputDateRangeField }}
        name="allowedRange"
        calendars={1}
        value={initialDatesRange}
        onChange={(newValue) => setDatesRange(newValue)}
      />
    </LocalizationProvider>
  );
}
