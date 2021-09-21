import React from "react";
import { User } from "./search-pannel";

interface project {
  id:number;
  name:string;
  personId:number;
  organization:string,
  created:number
}
interface ListProps {
  list:project[];
  user: User[];
}

export const List = ({ list,user }:ListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((list, index) => (
          <tr key={index}>
            <td>{list.name}</td>
            <td>{user.find(user => user.id===list.personId)?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
