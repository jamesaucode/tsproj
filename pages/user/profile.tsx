import React, { useEffect, useState } from "react";
import { NextFC } from "next";
import { makeJsonRequest } from "../../utils/httpRequest";
import { Layout, Heading } from "../../src/styles/shared";
import * as googleOAuth from "passport-google-oauth20";
import Spinner from '../../src/components/Spinner';

const Profile: NextFC<googleOAuth.Profile> = (props: googleOAuth.Profile) => {
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let APIUrl = `http://${window.location.host}/api/session`;
    makeJsonRequest(APIUrl).then(({ passport : { user }})=> {
      setProfile(user);
      setLoading(false);
    })
  }, []);
  if (loading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  } else {
    return (
      <Layout fadeIn>
        <Heading sub>Name: {profile.displayName}</Heading>
        <Heading sub>Email: {profile.emails[0].value}</Heading>
        <img src={profile.photos[0].value} alt="Google profile picture"/>
      </Layout>
    );
  }
};

export default Profile;
