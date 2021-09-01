import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const {isAuthenticated} = useAuth0();

  return (
    <>
      {!isAuthenticated && (
        <Fragment>
          <h3>Authorization needed</h3>
        </Fragment>
      )}
      {isAuthenticated && (
        <Fragment>
          <h1>Home page</h1>
        </Fragment>
      )}
    </>
  )
};

export default Home;
