import { Checkbox, Text } from "@create-figma-plugin/ui";
import { h, JSX } from "preact";

interface CheckboxProps {
  value: boolean;
  setValue: any;
  label: string;
  onClick?: any;
}

export default function CheckboxElement({
  value,
  setValue,
  label,
  onClick,
}: CheckboxProps) {
  // const [value, setValue] = useState<boolean>(false);
  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.checked;
    setValue(newValue);
  }
  return (
    <Checkbox
      onChange={handleChange}
      value={value}
      onClick={onClick}
      style={{ border: "none", cursor: "pointer" }}
    >
      <Text>{label}</Text>
    </Checkbox>
  );
}
