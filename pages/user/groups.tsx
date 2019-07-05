import React, { useState, useEffect } from "react";
import NavBar from "../../src/components/NavBar";
import styled from "styled-components";
import SVG from "react-inlinesvg";
import { IGroup } from "../../server/schemas/Group";
import { Layout } from "../../src/styles/shared";
import { NextFC } from "next";
import {
  handleJSONResponse,
  handleResponse
} from "../../services/fetch.service";
import { useUserData } from "../../src/hooks/useUserData";
import Link from "next/link";

const Input = styled.input`
  border: none;
  border: 1px solid #eee;
  border-radius: 5px;
  font-size: 0.75em;
  padding: 0.5em 1em;
`;
const GroupList = styled.ul`
  padding: 1em;
  display: flex;
  flex-direction: column;
`;
const GroupItem = styled.li`
  background-color: #fff;
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.15);
  color: #24292e;
  font-size: 0.9em;
  padding: 1.25em;
  margin: 0.75rem 0;
  &:hover {
    cursor: pointer;
  }
`;
const StyledLink = styled.a`
  color: #333;
  text-decoration: none;
`;

const Groups: NextFC = (props: any) => {
  const userData = useUserData();
  const searchRef = React.createRef<HTMLInputElement>();
  useEffect(() => {
    if (props.groups) {
      setGroupList(props.groups);
    }
    searchRef.current.focus();
  }, []);
  const [groupList, setGroupList] = useState<IGroup[]>([]);
  const [search, setSearch] = useState<string>("");
  const inputRef = React.createRef<HTMLInputElement>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
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
        setGroupList(
          groupList.concat({
            name: inputRef.current.value,
            ownerId: [userData._id]
          })
        );
      })
      .catch(err => console.log(err.message));
    inputRef.current.value = "";
  };
  const searchLowerCase = search.toLowerCase();
  const filteredGroup = groupList.filter(group =>
    group.name.toLowerCase().includes(searchLowerCase)
  );

  return (
    <>
      <NavBar />
      <Layout>
        <Input
          onChange={handleChange}
          value={search}
          ref={searchRef}
          placeholder="Search for a group"
        />
        <GroupList>
          {filteredGroup
            ? filteredGroup.map(group => (
                <>
                  {/* <StyledLink href={`/user/group?name=${group.name}`}> */}
                  <Link href={`/user/group/${group.name}`}>
                    <GroupItem key={group.name}>
                      <SVG src="/static/images/users.svg" />
                      {group.name}
                    </GroupItem>
                  </Link>
                  {/* </StyledLink> */}
                </>
              ))
            : null}
        </GroupList>
        <Input ref={inputRef} placeholder="Group Name" />
        <button onClick={handleSubmit}>Create</button>
      </Layout>
    </>
  );
};

Groups.getInitialProps = async ({ req, query }) => {
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

export default Groups;
