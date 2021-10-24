import { useEffect } from "react";
import { useAsync } from "./use-async";
import { request } from "./request";
import { project } from "../screens/project-list/list";
export const useProjects = (param?:Partial<project>)=>{
    const {run,...result} = useAsync<project[]>()
    useEffect(() => {
        run(request(`/projects`, param||{}))
    }, [param]);
    return result
}


