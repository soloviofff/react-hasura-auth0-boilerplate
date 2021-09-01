import React from "react";

import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useMutation, useSubscription, gql } from "@apollo/client";

const GET_ALL_USERS = gql`
  subscription {
    users {
      auth0_id
      avatar
      email
      last_seen
    }
  }
`;

export const ProfileComponent = () => {
  const { user } = useAuth0();
  const { loading, error, data } = useSubscription( GET_ALL_USERS );

  if (loading) {
    return <span>Loading...</span>;
  }
  if (error) {
    console.error(error)
    return <span>Error!</span>;
  }

  if (data.users) {
    return (
      <>
        <h2>{user.name}</h2>
        <p className="lead text-muted">{user.email}</p>
        <img
          src={user.picture}
          alt="Profile"
        />
        <p>{JSON.stringify(user, null, 2)}</p>
        {data.users.map(item => (
          <div key={item.auth0_id}>{JSON.stringify(item)}</div>
        ))}
      </>
    )
  }

  return <></>
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});
