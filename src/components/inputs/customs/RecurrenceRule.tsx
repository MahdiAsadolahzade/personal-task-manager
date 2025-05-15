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
}

const RecurrenceRule: FC<RecurrenceRuleProps> = ({
  name,
  register,
  setValue,
  errors,
  control,
  getValues,
}) => {
  // You can watch isRecurring or other values if needed
  const intervalPath = `${name}.interval`;
  const frequencyPath = `${name}.frequency`;

  const endDatePath = `${name}.endDate`;

  return (
    <div className="space-y-2">
      <TextField
      label="Interval"
      name={intervalPath}
      register={register}
      errors={errors}

      type="number"
      />
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
      label="End Date"
      name={endDatePath}
      register={register}
      errors={errors}
      type="date"
      // defaultValue={new Date(new Date().getFullYear(), 11, 31).toISOString().split("T")[0]}
      />
    </div>
  );
};

export default RecurrenceRule;
