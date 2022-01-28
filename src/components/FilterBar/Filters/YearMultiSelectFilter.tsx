import { AutocompleteChangeReason } from '@mui/material/Autocomplete'
import { useAppDispatch } from '../../../app/hooks'
import { yearChoosed, yearRemoved, yearsCleared } from '../../../features/filter/filterSlice'
import { MultiSelectFilter } from '../../MultiSelect/MultiSelectFilter'

interface YearFilterProps {
    items: number[]
}
export const YearMultiSelectFilter = ({items}: YearFilterProps) => {
    const dispatch = useAppDispatch();

    const handleChange = (event: any, value: any, reason: AutocompleteChangeReason, details: any ) => {
        if(reason === "selectOption"){
            dispatch(yearChoosed(details.option));
        }else if(reason === "removeOption"){
            dispatch(yearRemoved(details.option));
        }else if(reason === "clear"){
            dispatch(yearsCleared());
        }
    }
    
   return <MultiSelectFilter
        id="year"
        label="Rok"
        items={items}
        limit={4}
        onChange={handleChange}
    />
}
