import React, { useState, useEffect } from "react";
import NavBar from "../../src/components/NavBar";
import styled from "styled-components";
import SVG from "react-inlinesvg";
import Link from "next/link";
import { GroupTypes } from "../../resources/group/group.model";
import { Layout, Button, colors } from "../../utils/style";
import { NextFC } from "next";
import {
  handleJSONResponse,
  handleResponse,
} from "../../services/fetch.service";
import { useUserData } from "../../src/hooks/useUserData";

const Input = styled.input`
  border: none;
  border: 1px solid #eee;
  border-radius: 5px;
  background-color: #eee;
  font-size: 0.75em;
  padding: 0.5em 1em;
  margin: 10px 0;
`;
const GroupList = styled.ul`
  display: flex;
  flex-direction: column;
`;
const GroupItem = styled.li`
  background-color: #fff;
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.15);
  color: ${colors.black};
  font-size: 0.9em;
  padding: 1.25em;
  margin: 0.75rem 0;
  &:hover {
    cursor: pointer;
  }
`;

const Groups: NextFC = (props: any): JSX.Element => {
  const userData = useUserData();
  const searchRef = React.createRef<HTMLInputElement>();
  const [groupList, setGroupList] = useState<GroupTypes[]>([]);
  useEffect((): void => {
    if (props.groups) {
      setGroupList(props.groups);
    }
    searchRef.current.focus();
  }, []);
  const [search, setSearch] = useState<string>("");
  const inputRef = React.createRef<HTMLInputElement>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    fetch("/api/group", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: inputRef.current.value,
        creator: userData.data._id,
      }),
    })
      .then(handleResponse)
      .then((json): void => {
        setGroupList(
          groupList.concat({
            name: inputRef.current.value,
            creator: userData.data._id,
          }),
        );
      })
      .catch((err): void => console.log(err.message));
    inputRef.current.value = "";
  };
  const searchTermInLowerCase = search.toLowerCase();
  const filteredGroup = groupList.filter((group): boolean =>
    group.name.toLowerCase().includes(searchTermInLowerCase),
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
            ? filteredGroup.map(
                (group): JSX.Element => (
                  <React.Fragment key={group._id}>
                    <Link href={`/user/group/${group.name}`}>
                      <GroupItem key={group.name}>
                        <SVG src="/static/images/users.svg" />
                        {group.name}
                      </GroupItem>
                    </Link>
                  </React.Fragment>
                ),
              )
            : null}
          <Input ref={inputRef} placeholder="Group Name" />
          <Button fullWidth onClick={handleSubmit}>
            Create
          </Button>
        </GroupList>
      </Layout>
    </>
  );
};

interface InitialPropType {
  groups: { data: {} };
}

// Needs fixing this type
Groups.getInitialProps = async ({
  req,
  query,
}): Promise<InitialPropType | {}> => {
  const isServer = !!req;
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const apiUrl = isServer
    ? `${protocol}://${req.headers.host}/api/group`
    : `${protocol}://${window.location.host}/api/group`;
  if (isServer) {
    return { ...query };
  } else {
    const response = await fetch(apiUrl, {
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const json = handleJSONResponse(response);
    return json
      .then(
        (data): InitialPropType => {
          return { groups: data.data };
        },
      )
      .catch((err: Error): string => err.message);
  }
};

export default Groups;
