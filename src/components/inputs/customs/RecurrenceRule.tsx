
import { FC } from "react";
import TextField from "../TextField";
import AutoComplete from "../AutoComplete";
import { Frequencies } from "@/mock/frequency.data";

interface RecurrenceRuleProps {
  name: string;
  register: any;
  watch: any;
  setValue: any;
  errors: any;
  control: any;
  getValues: any;
  unregister: any;
}

const RecurrenceRule: FC<RecurrenceRuleProps> = ({
  name,
  register,
  setValue,
  errors,
  control,
  getValues,
  watch,
}) => {
  // You can watch isRecurring or other values if needed
  const intervalPath = `${name}.interval`;
  const frequencyPath = `${name}.frequency`;

  const endDatePath = `${name}.endDate`;

  const isRecurring = watch("isRecurring");



  if (!isRecurring) return null;

  return (
    <div className="space-y-2">
      <AutoComplete
        control={control}
        errors={errors}
        name={frequencyPath}
        register={register}
        getValues={getValues}
        setValue={setValue}
       
        suggestions={Frequencies}
        label="Frequency"
      />
      <TextField
        label="Interval"
        name={intervalPath}
        getValues={getValues}
        register={register}
        errors={errors}
        type="range"
        rangeConfiguration={{ min: 1, max: 7 }}
      />
      <TextField
        label="End Date"
        name={endDatePath}
        register={register}
        errors={errors}
        type="date"
        defaultValue={
          new Date(new Date().getFullYear(), 11, 31).toISOString().split("T")[0]
        }
      />


    </div>
  );
};

export default RecurrenceRule;
