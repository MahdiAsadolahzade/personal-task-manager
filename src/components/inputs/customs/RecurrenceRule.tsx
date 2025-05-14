import { FC } from "react";
import TextField from "../TextField";


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
  watch,
  setValue,
  errors,
  control,
  getValues,
}) => {
  // You can watch isRecurring or other values if needed
  const intervalPath = `${name}.interval`;
  const frequencyPath = `${name}.frequency`;


  

  return (
    <div className="space-y-2">
      <TextField
        label="Interval"
        name={intervalPath}
        register={register}
        errors={errors}
        type="number"
      />
      <TextField
        label="Frequency"
        name={frequencyPath}
        register={register}
        errors={errors}
        type="text"
      />
    </div>
  );
};

export default RecurrenceRule;
