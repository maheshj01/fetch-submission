import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select"

interface Option {
    label: string;
    value: string;
}

interface FSelectProps {
    label: string;
    options: Option[];
    value: string;
    className?: string;
    onChange: (value: string) => void;
};

export default function FSelect({ label, options, value, onChange, className }: FSelectProps) {
    return (
        <Select
            value={value}
            onValueChange={onChange}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent
                className={className}
            >
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}