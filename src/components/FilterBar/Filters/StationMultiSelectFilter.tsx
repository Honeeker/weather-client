import { AutocompleteChangeReason } from '@mui/material/Autocomplete';
import { useAppDispatch } from '../../../app/hooks';
import { Station } from '../../../domain/station';
import { stationChoosed, stationRemoved, stationsCleared } from '../../../features/filter/filterSlice';
import { MultiSelectFilter } from '../../MultiSelect/MultiSelectFilter';

export interface StationFilterProps {
    items: Station[]
}

export const StationMultiSelectFilter = ({ items }: StationFilterProps) => {
    const dispatch = useAppDispatch();

    const handleChange = (event: any, value: any, reason: AutocompleteChangeReason, details: any ) => {
        let choosedStation: Station = {
            key: details.option.id,
            name: details.option.name
        }
        if(reason === "selectOption"){
            dispatch(stationChoosed(choosedStation));
        }else if(reason === "removeOption"){
            dispatch(stationRemoved(choosedStation));
        }else if(reason === "clear"){
            dispatch(stationsCleared());
        }
    }

    const getOptionLabel = (option: Station) => `${option.name} [${option.key}]`;
   
    return <MultiSelectFilter
        id="station"
        label="Stacja"
        items={items}
        onChange={handleChange}
        getOptionLabel={getOptionLabel}
    />
}
