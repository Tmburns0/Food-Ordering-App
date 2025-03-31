import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

type AppState = {
  returnTo?: string; 
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();

  // Load environment variables for Auth0 configuration
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

 
  if (!domain || !clientId || !redirectUri) {
    throw new Error("Missing Auth0 environment variables. Please check your .env file.");
  }


  const onRedirectCallback = (appState?: AppState) => {
    if (appState?.returnTo) {
      navigate(appState.returnTo); 
    } else {
      navigate("/"); 
    }
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
