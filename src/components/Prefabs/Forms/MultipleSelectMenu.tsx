import React, { FunctionComponent } from "react";
import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
} from "@material-ui/core";

import KeyValue from "../../../models/KeyValue";

type MultipleSelectMenuProps = {
  items: KeyValue[];
  label: string;
  value: string[];
  className?: string;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
};

const MultipleSelectMenu: FunctionComponent<MultipleSelectMenuProps> = ({
  items,
  label,
  value,
  className,
  onChange,
}) => {
  return (
    <FormControl variant="filled" className={className}>
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-label`}
        value={value}
        onChange={onChange}
        renderValue={(selected) =>
          (selected as string[])
            .map((key) => items.filter((item) => item.key === key)[0].value)
            .join(", ")
        }
        multiple
      >
        <MenuItem value={""} disabled={true}>
          <em>Selecione</em>
        </MenuItem>
        {items.map((item) => (
          <MenuItem key={item.key} value={item.key}>
            <Checkbox checked={value.some((x) => x === item.key)} />
            <ListItemText primary={item.value} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectMenu;
