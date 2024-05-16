import GroupService from "./GroupService";
import React from "react";

const GroupServiceContext = React.createContext();

export const GroupServiceProvider = ({children}) => {
    const groupService = new GroupService();

    return (
        <GroupServiceContext.Provider value = {groupService}>
            {children}
        </GroupServiceContext.Provider>
    );
};

export const useGroupService = () => React.useContext(GroupServiceContext);