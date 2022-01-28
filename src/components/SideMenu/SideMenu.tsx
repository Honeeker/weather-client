import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './SideMenu.css'
import { SideMenuItem, SideMenuItemProps } from './SideMenuItem'

export const SideMenu = () => {
    const [selectedDashboard, setSelectedDashboard] = useState<string>();
    let navigate = useNavigate();
    
    const handleSelect = (path: string) =>{
        setSelectedDashboard(path);
        navigate(path);
    }

    const items: SideMenuItemProps[] = [
        {
            selected: false,
            path: "/average",
            label: "Średnia temperatura",
            handleSelect: handleSelect
        },
        {
            selected: false,
            path: "/max",
            label: "Maksymalna temperatura",
            handleSelect: handleSelect
        },
        {
            selected: false,
            path: "/min",
            label: "Minimalna temperatura",
            handleSelect: handleSelect
        }   
    ]

    return (
        <div className="sideMenu">
            {
                items.map((item, index) =>{
                    let isSelected = false;
                    if(selectedDashboard === item.path){
                       isSelected = true;
                    }
                    return (
                        <SideMenuItem
                            key={index}
                            selected={isSelected}
                            path={item.path}
                            label={item.label}
                            handleSelect={item.handleSelect}
                        />
                    )
                })
            }
        </div>
    )
}
