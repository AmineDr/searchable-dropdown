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
}

type Option = {
    label: string;
    value: string;
}