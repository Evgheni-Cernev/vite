import React, { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';

interface WithAuthProps {
    isAuth?: boolean;
}

function withAuth<T extends JSX.IntrinsicAttributes>(Component: ComponentType<T>): React.FC<T & WithAuthProps> {
  const WrappedComponent: React.FC<T & WithAuthProps> = (props) => {
    const isAuth = window.localStorage.getItem('token');
    if (!isAuth) {
      return <Navigate to="/signin" replace />;
    }

    return <Component {...props as T} />;
  };

  return WrappedComponent;
}

export default withAuth;
