import { useEffect } from "react";
import { useAsync } from "./use-async";
import { request } from "./request";
import { project } from "../screens/project-list/list";
export const useProjects = (param?:Partial<project>)=>{
    const {run,...result} = useAsync<project[]>()
    console.log(param);
    let data = JSON.parse(JSON.stringify(param))
    param?.personId == 0&&(data.personId=undefined);
    useEffect(() => {
        run(request(`/projects`, data||{}))
    }, [param]);
    return result
}


