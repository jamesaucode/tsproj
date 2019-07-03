import React, { useState, useEffect } from "react";
import NavBar from "../../src/components/NavBar";
import styled from "styled-components";
import { IGroup } from '../../server/schemas/Group';
import { Layout, Heading } from "../../src/styles/shared";
import { NextFC } from "next";
import {
  handleJSONResponse,
  handleResponse
} from "../../services/fetch.service";
import { useUserData } from "../../src/hooks/useUserData";

const Input = styled.input`
  border: none;
  border: 1px solid #333;
  font-size: 0.8em;
  padding: 0.5em;
`;
const GroupList = styled.ul`
  padding: 1em;
  display: flex;
  flex-direction: column;
`;
const GroupItem = styled.li`
  font-size: 0.9em;
  padding: 0.5em;
`;

const Group: NextFC = (props: any) => {
  console.log(props);
  const [groupList, setGroupList] = useState<IGroup[]>([]);
  useEffect(() => {
      if (props.groups) {
        setGroupList(props.groups);
      }
  }, [])
  const inputRef = React.createRef<HTMLInputElement>();
  const userData = useUserData();
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    fetch("/api/groups", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: inputRef.current.value,
        ownerId: [userData._id]
      })
    })
      .then(handleResponse)
      .then(json => {
        setGroupList(groupList.concat({name: inputRef.current.value, ownerId: [userData._id]}))
      })
      .catch(err => console.log(err.message));
    inputRef.current.value = "";
  };
  return (
    <>
      <NavBar />
      <Layout>
        <Heading>This is group page.</Heading>
        <Input ref={inputRef} placeholder="Group Name" />
        <button onClick={handleSubmit}>Create</button>
        <GroupList>
          {groupList
            ? groupList.map(group => <GroupItem key={group.name}>{group.name}</GroupItem>)
            : null}
        </GroupList>
      </Layout>
    </>
  );
};

Group.getInitialProps = async ({ req, query }) => {
  const isServer = !!req;
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const apiUrl = isServer
    ? `${protocol}://${req.headers.host}/api/groups`
    : `${protocol}://${window.location.host}/api/groups`;
  if (isServer) {
    return { ...query };
  } else {
    const response = await fetch(apiUrl, {
      credentials: "include",
      headers: {
        "content-type": "application/json"
      }
    });
    const json = handleJSONResponse(response);
    return json
      .then(data => {
        return { groups: data };
      })
      .catch(err => err.message);
  }
};

export default Group;
