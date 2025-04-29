import { FilterDropdown } from "../FilterDropdown";
import { observer } from "mobx-react";

const BaseInput = observer((props) => (
  <FilterDropdown onChange={(value) => props.onChange(value)} items={[{ label: "yes" }, { label: "no" }]} />
));

export const Common = [
  {
    key: "empty",
    label: "空",
    input: BaseInput,
  },
];
