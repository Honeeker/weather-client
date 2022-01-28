export interface SideMenuItemProps{
    selected: boolean;
    label: string;
    path: string;
    handleSelect(path: string): void;
}

export const SideMenuItem = ( {selected, label, path, handleSelect, }: SideMenuItemProps) => {

    return (
        <div className="item" style={{backgroundColor: selected? "grey": ""}} onClick={() => handleSelect(path)}>
            <label style={{"display": "block"}}>
                {label}
            </label>
        </div>
    )
}
