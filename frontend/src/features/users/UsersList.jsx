import React, { useEffect } from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import useTitle from "../../hooks/useTitle";

export default function UsersList() {
  useTitle('Users')
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) content = <p>{error?.data?.message}</p>;

  if (isSuccess) {
    const { ids } = users;
    const tableContent = ids?.length && ids.map((userId) => <User key={userId} userId={userId} />)

    content = (
      <table>
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Roles</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
}
