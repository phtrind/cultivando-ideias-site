import React, { FunctionComponent } from "react";
import { FormControl, MenuItem, InputLabel, Select } from "@material-ui/core";

import KeyValue from "../../../models/KeyValue";

type SelectMenuProps = {
  items: KeyValue[];
  label: string;
  value: string;
  className?: string;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
};

const SelectMenu: FunctionComponent<SelectMenuProps> = ({
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
      >
        <MenuItem value={""} disabled={true}>
          <em>Selecione</em>
        </MenuItem>
        {items.map((item) => (
          <MenuItem key={item.key} value={item.key}>
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectMenu;
