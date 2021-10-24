import { useEffect } from "react";
import { useAsync } from "./use-async";
import { request } from "./request";
import { project } from "../screens/project-list/list";
export const useUsers = (param?:Partial<project>):any=>{
    const {run,...result} = useAsync<project[]>()
    useEffect(() => {
        run(request(`/users`, param||{}))
    }, [param]);
    return result
}


