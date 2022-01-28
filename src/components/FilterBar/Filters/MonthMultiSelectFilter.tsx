import { AutocompleteChangeReason } from '@mui/material/Autocomplete'
import { useAppDispatch } from '../../../app/hooks'
import { monthChoosed, monthRemoved, monthsCleared } from '../../../features/filter/filterSlice'
import { MultiSelectFilter } from '../../MultiSelect/MultiSelectFilter'

const getMonths = () =>{
    return [
        {key: 1, name: "Styczeń"},
        {key: 2, name: "Luty"},
        {key: 3, name: "Marzec"},
        {key: 4, name: "Kwiecień"},
        {key: 5, name: "Maj"},
        {key: 6, name: "Czerwiec"},
        {key: 7, name: "Lipiec"},
        {key: 8, name: "Sierpień"},
        {key: 9, name: "Wrzesień"},
        {key: 10, name: "Październi"},
        {key: 11, name: "Listopad"},
        {key: 12, name: "Grudzień"}
    ]
}

export const MonthMultiSelectFilter = () => {
    const dispatch = useAppDispatch();
    
    const handleChange = (event: any, value: any, reason: AutocompleteChangeReason, details: any ) => {
        if(reason === "selectOption"){
            dispatch(monthChoosed(details.option.key));
        }else if(reason === "removeOption"){
            dispatch(monthRemoved(details.option.key));
        }else if(reason === "clear"){
            dispatch(monthsCleared())
        }
    }

    const getOptionLabel = (option: any) => option.name;
    return <MultiSelectFilter
        id="month"
        label="Miesiąc"
        items={getMonths()}
        limit={4}
        onChange={handleChange}
        getOptionLabel={getOptionLabel}
    />
}
