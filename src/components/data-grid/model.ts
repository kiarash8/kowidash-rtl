export interface Column {
    id: any;
    label: string;
    sort: boolean;
    filter: 'text' | 'select' | 'none';
    filterOption?: Array<FilterOption>;
    minWidth?: number;
    align?: 'right' | 'left';
    format?: (value: any) => any;
    actions?: Array<ActionColumn>;
}

export interface ActionColumn {
    type: 'link' | 'dialog' | 'throwback-data';
    button: ActionButton;
    link?: Link;
    dialog?: DialogOption;
    throwback?: ThrowbackData;
}

export interface Filtering {
    id: string;
    value: any;
}
export interface Sorting {
    id: string;
    order: 'asc' | 'desc' | undefined;
}

interface FilterOption {
    key: string | number;
    value: any;
}

interface Link {
    path?: string;
    data?: Array<string>;
} 

interface ThrowbackData {
    data: Array<string>;
    callback: (data: any) => any;
}

interface ActionButton {
    variant: 'contained' | 'text' | 'outlined';
    color: 'default' | 'primary' | 'secondary';
    caption: any; 
    disabled?: boolean;
}

interface DialogActionButton extends ActionButton {
    callback: (data: object | undefined) => any;
}

interface DialogOption {
    title: string;
    description: string;
    agree: DialogActionButton;
    disagree: DialogActionButton;
    data?: Array<string>;
}

// component props

export interface DataGridProps {
    columns: Column[];
    rows: Array<any>;
    hasFilter: boolean;
}

export interface PromptDialogProps {
    option: DialogOption; 
    button: ActionButton;
    data?: object | undefined;
}
  
export interface SelectFilterProps {
    id: string;
    options: Array<FilterOption>;
    filtering: any;
}

export interface TextFilterProps {
    id: string;
    filtering: any;
    disabled?: boolean;
}

export interface ColumnLabelProps {
    id: string;
    title: string;
    sort: boolean;
    sorting: any;
}