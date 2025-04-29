import { observer } from "mobx-react";
import { FilterInput } from "../FilterInput";

const BaseInput = observer(({ value, onChange, placeholder }) => {
  return (
    <FilterInput type="text" value={value} onChange={onChange} style={{ fontSize: 14 }} placeholder={placeholder} />
  );
});

export const StringFilter = [
  {
    key: "contains",
    label: "包含",
    valueType: "single",
    input: (props) => <BaseInput {...props} />,
  },
  {
    key: "not_contains",
    label: "不包含",
    valueType: "single",
    input: (props) => <BaseInput {...props} />,
  },
  {
    key: "regex",
    label: "正则",
    valueType: "single",
    input: (props) => <BaseInput {...props} />,
  },
  {
    key: "equal",
    label: "相等",
    valueType: "single",
    input: (props) => <BaseInput {...props} />,
  },
  {
    key: "not_equal",
    label: "不相等",
    valueType: "single",
    input: (props) => <BaseInput {...props} />,
  },
];
