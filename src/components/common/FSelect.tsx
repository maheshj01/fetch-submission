import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select"

interface FSelectProps {
    label: string;
    options: string[];
    value: string;
    className?: string;
    onChange: (value: string) => void;
};

export default function FSelect({ label, options, value, onChange, className }: FSelectProps) {
    return (
        <Select
            value={value}
            onValueChange={onChange}
        >
            <SelectTrigger className={className}>
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent
                className={className}
            >
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {options.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                        // <SelectItem value="apple">Apple</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}