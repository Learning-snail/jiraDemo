import { Table, TableProps } from "antd";
import React from "react";
import { User } from "./search-pannel";
import dayjs from "dayjs";
export interface project {
  id: number;
  name: string;
  personId: number | string;
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
      columns={[
        {
          title: "名称",
          dataIndex: "name",
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
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
