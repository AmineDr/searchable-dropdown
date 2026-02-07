import SelectDropdownField from "./stories/SelectDropdownField";

export default function App() {
  return (
    <div className="mx-[5%] mt-10">
      <SelectDropdownField
        label="Selectlabel"
        options={[
          {
            label: "Option 1",
            value: "option-1"
          },
          {
            label: "Option 2",
            value: "option-2"
          },
          {
            label: "Option 3",
            value: "option-3"
          },
          {
            label: "Option 4",
            value: "option-4"
          },
          {
            label: "Very long Option",
            value: "long-option"
          }
        ]}
        withSearch
        multiple
      />
    </div>
  )
}