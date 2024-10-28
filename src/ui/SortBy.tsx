import { useSearchParams } from "react-router-dom";
import { Select } from "./Select";
import { FormEvent } from "react";

export default function SortBy({
  options,
}: {
  options: { value: string; label: string }[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleOnChange(e: FormEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", (e.target as HTMLOptionElement).value);
    setSearchParams(searchParams);
  }
  const currentSortParam = searchParams.get("sortBy") || "";
  return (
    <Select value={currentSortParam} onChange={handleOnChange} type="white">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}
