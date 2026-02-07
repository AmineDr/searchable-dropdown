import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { createPortal } from "react-dom";

type SearchableSelectProps = {
    label: string;
    options: Option[];
    id?: string;
    multiple?: boolean;
    withSearch?: boolean;
    outlined?: boolean;
    labelOnTop?: boolean;
    withPortal?: boolean;
    zIndex?: number;
    onValuesChange?: (values: string[]) => void
}

type Option = {
    label: string;
    value: string;
}

export function SelectDropdownField(
        { 
            id="select-dropdown-field",
            label,
            labelOnTop,
            multiple, outlined,
            withSearch,
            withPortal,
            zIndex=1000,
            options,
            onValuesChange
        }: SearchableSelectProps
    ) {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [query, setQuery] = useState("");
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [portalDropdownPos, setPortalDropdownPos] = useState({
        top: 0,
        left: 0,
        width: 0
    })

    const checkFocus = (e: MouseEvent) => {
        const selectElement = document.getElementById(id) as HTMLDivElement;
        if (!selectElement) return;
        if (!withPortal) {
            if (!selectElement.contains(e.target as Node)) {
                setFocused(false);
            }
            return;
        }

        if (!dropdownRef.current?.contains(e.target as Node)) {
            setFocused(false);
        }
    }

    useEffect(() => {
        window.addEventListener("mousedown", checkFocus);
        return () => window.removeEventListener("mousedown", checkFocus);
    }, []);

    useEffect(() => {
        if (!multiple && selectedOptions.length > 1) {
            const v = [selectedOptions[0]];
            setSelectedOptions(v);
        } else {

        }
    }, [multiple, selectedOptions]);

    useEffect(() => {
        if (!withSearch || !focused) {
            setQuery("");
        }
        if (withSearch && focused) inputRef.current?.focus();
        if (focused && withPortal) {
            const pos = selectRef.current?.getBoundingClientRect();
            console.log(pos?.height, pos?.top, selectRef.current?.clientHeight)
            if (pos) {
                setPortalDropdownPos({
                    top: pos.top + (selectRef.current?.clientHeight || 30) + 10,
                    left: pos.left,
                    width: pos.width
                })
            }
        }
    }, [withSearch, focused, withPortal]);

    const highlightText = (text: string) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.split(regex).map((s) => {
            if (s.toLowerCase() !== query.toLowerCase()) return s;
            return <span className="bg-teal-200">{s}</span>
        })
    }

    const filterOptions = () => {
        return options.filter((option => option.label.toLowerCase().search(query.toLowerCase()) > -1));
    }

    const dropdownComponent = (
        <div className="absolute w-full" ref={dropdownRef} style={{
            display: focused ? "block" : "none",
            top: withPortal ? portalDropdownPos.top : (selectRef.current?.clientHeight || 30) + 10,
            left: withPortal ? portalDropdownPos.left : 0,
            width: withPortal ? portalDropdownPos.width : '100%',
            zIndex
        }}>
            {
                withSearch && <div className="relative">
                    <Search className="absolute left-2 top-2 text-gray-600" size={16} />
                    <input
                        ref={inputRef}
                        className="w-full h-8 pl-7 border border-gray-200 focus:outline-none px-2"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search something"
                    />
                    <button onClick={() => setQuery("")} className="cursor-pointer">
                        <X className="absolute right-2 top-2 text-gray-500 border rounded-full" size={16} />
                    </button>
                </div>
            }
            <div className="border border-gray-200 rounded-sm shadow-md">
                <ul className="flex flex-col gap-1 py-1 cursor-pointer select-none">
                    {
                        filterOptions().map(option => (
                            <li
                                key={option.value}
                                className="px-3 hover:bg-teal-50"
                                onClick={() => {
                                    if (!!selectedOptions.find(o => o.value === option.value)) return;
                                    if (!multiple) {
                                        setSelectedOptions([option]);
                                        setFocused(false);
                                        onValuesChange && onValuesChange([option.value]);
                                        return;
                                    }
                                    setSelectedOptions([...selectedOptions, option]);
                                    onValuesChange && onValuesChange([...selectedOptions.map(o => o.value), option.value]);
                                }}
                            >
                                {highlightText(option.label)}
                            </li>
                        ))
                    }
                    {
                        !filterOptions().length && <li className="px-3 text-gray-400">
                            No options
                        </li>
                    }
                </ul>
            </div>
        </div>
    );

    return <div className={`flex ${labelOnTop ? "flex-col" : "gap-1"}`} id={id}>
        <label className="font-semibold text-sm mt-2.5">{label}</label>
        <div className="flex flex-col items-center w-full relative">
            <div ref={selectRef} onClick={() => setFocused(true)} className={`flex justify-between items-center px-2 border border-gray-200 w-full h-10 rounded-sm mb-2 hover:ring-1 ring-gray-300 ${outlined ? 'bg-gray-200' : ''}`}>
                <div className="flex items-center gap-1 p-1">
                    {
                        multiple ?
                            selectedOptions.map(option => (
                                <span key={option.value} className="flex items-center justify-between gap-1 rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600">
                                    {option.label}
                                    <button className="rounded-full text-black cursor-pointer" onClick={() => {
                                        setSelectedOptions(prev => {
                                            return prev.filter(o => o.value !== option.value);
                                        })
                                    }}>
                                        <X size={12} className="border border-gray-500 rounded-full" />
                                    </button>
                                </span>
                            ))
                            :
                            <>{!!selectedOptions.length && selectedOptions[0].label}</>
                    }
                </div>
                <ChevronDown className="text-gray-600" />
            </div>
            {withPortal ? createPortal(dropdownComponent, document.body) : dropdownComponent}
        </div>
    </div>
}

export default SelectDropdownField;