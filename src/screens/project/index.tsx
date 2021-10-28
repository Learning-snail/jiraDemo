import { Link, Redirect, RouteComponentProps } from "react-router-dom";
import {Route,Switch} from 'react-router'
import { EpicScreen } from "../epic";
import { KanbanScreen } from "../kanban";
interface MatchParams {
    id: string
}
const Black = () => {
    console.log(window.location.pathname);
    
    return (
        <div>没匹配到</div>
    )
}
export const ProjectScreen = (props: RouteComponentProps<MatchParams>) => {
    console.log(props.match.params.id);
    
  return (
    <div>
      <h3>ProjectScreen</h3>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Switch>
        <Route exact path={"/projects/:id/kanban"} component={KanbanScreen} />
        <Route exact path={"/projects/:id/epic"} component={EpicScreen} />
        <Redirect to={window.location.pathname + '/kanban'}/>
      </Switch>
    </div>
  );
};
