// components/YearInput.tsx
interface YearInputProps {
  value: number;
  legend: string;
  onChange: (year: number) => void;
  label?: string;
  minYear?: number;
  maxYear?: number;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const YearInput = ({
  value,
  onChange,
  legend = "Año",
  minYear = 1900,
  maxYear = new Date().getFullYear() + 10,
  required = false,
  disabled = false,
  className = "",
}: YearInputProps) => {
  const generateYearOptions = () => {
    const years = [];
    for (let year = maxYear; year >= minYear; year--) {
      years.push(year);
    }
    return years;
  };

  return (
    <fieldset className={`fieldset ${className}`}>
      <legend className="fieldset-legend">{legend}</legend>
      <select
        value={value}
        onChange={e => onChange(parseInt(e.target.value))}
        className="select select-bordered w-full"
        disabled={disabled}
        required={required}
      >
        <option value="">Seleccione un año</option>
        {generateYearOptions().map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </fieldset>
  );
};

export default YearInput;
