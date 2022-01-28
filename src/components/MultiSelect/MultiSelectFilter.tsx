import Autocomplete, { AutocompleteChangeReason } from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

export interface MultiSelectProps{
    id: string;
    label: string;
    items: any[];
    limit?: number;
    onChange(event: any, value: any, reason: AutocompleteChangeReason, details: any): void;
    getOptionLabel?(option: any): string;

}

export const MultiSelectFilter = ({id, label, items, limit, getOptionLabel, onChange}: MultiSelectProps) => {

    return <Autocomplete
        multiple
        limitTags={limit? limit : 1}
        id={`${id}-multiselect`}
        fullWidth={true}
        options={items}
        getOptionLabel={getOptionLabel !== undefined? getOptionLabel :  option => option.toString()}
         sx={{ padding: "0px 5px"}}
        renderInput={(params) => (
            <TextField
                {...params}
                label={label}
            />
        )}
        onChange={onChange}
    />
}
