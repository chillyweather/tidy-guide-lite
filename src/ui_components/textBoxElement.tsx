import { h, JSX } from "preact";

export function textBoxElement(
  value: string,
  setValue: any,
  placeholder = "Title",
  isDisabled: boolean = false
) {
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setValue(newValue);
  }

  return (
    <input
      onInput={handleInput}
      placeholder={placeholder}
      value={value}
      className={"dialogInput listInputStyle"}
      disabled={isDisabled}
    />
  );
}
