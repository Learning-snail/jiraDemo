import { Table, TableProps } from "antd";
import React from "react";
import { User } from "./search-pannel";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
export interface project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
}
interface ListProps extends TableProps<project>{
  user: User[];
}

export const List = ({ user,...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      rowKey={"id"}
      columns={[
        {
          title: "名称",
          render(val,project) {
            return (
              <Link to={`/projects/${String(project.id)}`}>{project.name}</Link>
            )
          }
        },
        {
          title: "部门",
          dataIndex: "organization",
          key: 'organization',
        },
        {
          title: "负责人",
          key: 'personId',
          render(value, project) {
            return (
              <span>
                {user.find((user) => user.id === project.personId)?.name}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          key: 'time',
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
