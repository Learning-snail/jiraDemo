import { List, project } from "./list";
import { SearchPannel } from "./search-pannel";
import React, { useState, useEffect, useMemo } from "react";
import {useMount,useDebounce, useDocumentTitle} from '../../utils/index'
import styled from "@emotion/styled";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useProjectsSearchParams } from "./util";
export const ProjectListScreen = () => {
  const [param,setParam] = useProjectsSearchParams()
  const [keys,setKeys] = useState<('name'|'personId')[]>(['name','personId'])
  const usedebouncedParams = useDebounce(param ,200)
  const result = useProjects(usedebouncedParams)
  const {isLoading,data:user} = useUsers()
  useDocumentTitle('项目列表')
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPannel
        param={param}
        setParam={setParam}
        user={user|| []}
      ></SearchPannel>
      <List loading={isLoading} dataSource={result.data || []} user={user||[]}></List>
    </Container>
  );
};

const Container = styled.div`
padding: 3.2rem;
width: 100%;
`