import { useMemo, useState } from "react";

export const useProjectsSearchParams = () => {
    const [param,setParam] = useState<{name:string,personId:number}>({
        name: "",
        personId: 0,
      });
      const projectParams = useMemo(() =>({...param,personId:Number(param.personId)}),[param])
      return [projectParams,setParam] as const
}