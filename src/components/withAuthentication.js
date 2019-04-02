import React from 'react';
import { Redirect } from 'react-router-dom';
import { currentUser } from '../service/auth';

const withAuthentication = WrappedComponent => {
  return (props) => {
      if (currentUser()) {
        return <WrappedComponent {...props} />;
      }

      return <Redirect to="/login" />
    }
};

export default withAuthentication;
