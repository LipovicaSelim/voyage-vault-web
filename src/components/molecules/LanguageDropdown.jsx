import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";

export default function LanguageDropdown() {
  const [select, setSelect] = useState("GB");
  const onSelect = (code) => setSelect(code);
  return (
    <div className="LanguageDropdown">
      <ReactFlagsSelect
        selected={select}
        onSelect={setSelect}
        countries={["GB", "AL"]}
        showSelectedLabel={false}
        showOptionLabel={false}
        selectedSize={20}
        optionsSize={16}
        fullWidth={false}
        alignOptionsToRight={false}
        className="custom-flag-select"
      />
      <div className="react-tel-input flag us"></div>
    </div>
  );
}
