import { FC } from "react";
import TextField from "../TextField";

type TrecurrenceRule = {
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  interval: number; // Every X days/weeks/months/years
  endDate?: string; // When the recurrence should stop
  exceptions?: string[]; // Dates where the task shouldn't appear
  byWeekDay?: number[]; // For weekly - days of week (0-6, Sun-Sat)
  byMonthDay?: number[]; // For monthly - specific days
};

const RecurrenceRule = ({
  register,
  watch,
  setValue,
  errors,
  control,
}: any) => {


  return <div>
    <TextField label="Interval" name="interval" register={register} errors={errors} type="number"/>
  </div>;
};

export default RecurrenceRule;
