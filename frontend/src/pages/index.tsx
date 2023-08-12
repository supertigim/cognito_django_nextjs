import { useAuth } from "react-oidc-context";
import { useState } from "react";
import { Image } from '@chakra-ui/react';
import Head from 'next/head';

import {
    ArrowLeftOnRectangleIcon,
    ArrowRightOnRectangleIcon,
  } from "@heroicons/react/24/solid/index.js";

const Home = () => {
    const auth = useAuth();

    const [specialResult, setSpecialResult] = useState("");
    const [error, setError] = useState("");

    const onSignOut = async () => {
        // Since the logout endpoint is not registered in Cognito's oidc-configuration path,
        // the auth.signoutRedirect() method does not work properly.
        //
        // Therefore, log out the user from the page using the auth.removeUser() method,
        // and then redirect the user to Cognito's logout endpoint to log the user out of the Cognito auth session.
        await auth.removeUser();
        location.replace(
          `${process.env.NEXT_PUBLIC_COGNITO_ENDPOINT}/logout?client_id=${
            process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID
          }&logout_uri=${window.location.origin}`
        );
      };
    
    const grantAccess = async () => {
        if (!auth.user) return;
        
        await fetch(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + "/grant-access", {
            method: "POST",
            headers: {
            Authorization: `Bearer ${auth.user.access_token}`,
            },
        }).then(async (res) => {
            if (res.ok) {
            alert("Permission is granted! Please sign in again.");
            onSignOut();
            } else alert((await res.json()).message);
        });
        };

      const blockAccess = async () => {
          if (!auth.user) return;
          
          await fetch(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + "/block-access", {
              method: "POST",
              headers: {
              Authorization: `Bearer ${auth.user.access_token}`,
              },
          }).then(async (res) => {
              if (res.ok) {
              alert("Permission is blocked! Please sign in again.");
              onSignOut();
              } else alert((await res.json()).message);
          });
          };

    const getCatImage = async () => {
        if (!auth.user) return;
        setSpecialResult("");
        setError("");
    
        await fetch(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + "/cat", {
          headers: {
            Authorization: `Bearer ${auth.user.access_token}`,
          },
        }).then(async (res) => {
          if (res.ok) setSpecialResult((await res.json()).image);
          else setError((await res.json()).message);
        });
      };
    
    // const Logo = 
  
    return (
      <>
    <Head>
      <title>Cognito PoC</title>
      <meta name="description" content="" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <link rel="icon" href="/favicon.png" />
    </Head>
      {auth.isAuthenticated ? (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <Image
                className="mx-auto max-h-24 object-cover"
                src='/images/logo.png'
                alt="Logo"
              />
              <div className="text-center mt-6 text-xl">
                <span>You are signed in with</span>
                <span className="font-bold text-orange-500">{` ${auth.user.profile.email}`}</span>
              </div>
              <button
                onClick={grantAccess}
                type="button"
                className="flex w-full justify-center items-center rounded-md bg-gray-100 px-4 py-2 mt-6
                  text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none"
              >
                Get permission
              </button>
              <button
                onClick={blockAccess}
                type="button"
                className="flex w-full justify-center items-center rounded-md bg-gray-100 px-4 py-2 mt-2
                  text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none"
              >
                Block permission
              </button>
              <button
                onClick={getCatImage}
                type="button"
                className="flex w-full justify-center items-center rounded-md border border-transparent bg-orange-500 px-4 py-2 mt-4
                  text-base font-semibold text-white shadow-sm hover:bg-orange-600 focus:outline-none"
              >
                Show me a cat (permission required)
              </button>

              {!!specialResult && (
                <Image
                  className="mt-4 mx-auto max-h-64 object-cover"
                  src={specialResult}
                  alt=""
                />
              )}

              {!!error && (
                <p className="mt-4 font-semibold text-red-600 text-center">
                  {error}
                </p>
              )}

              <button
                onClick={onSignOut}
                type="button"
                className="flex w-full justify-center items-center rounded-md border-2 border-red-300 bg-white px-4 py-2 mt-6
                  text-base font-medium text-red-700 shadow-sm hover:bg-gray-50 focus:outline-none"
              >
                <ArrowRightOnRectangleIcon
                  className="-ml-1 mr-3 h-5 w-5 min-w-[20px] min-h-[20px]"
                  aria-hidden="true"
                />
                Sign Out
              </button>

              <div className="font-semibold mt-6 mb-2">Access Token (JWT)</div>
              <p className="bg-gray-100 rounded-md p-4 text-xs text-gray-700 break-all">
                {auth.user.access_token}
              </p>
              Go to <a href="https://JWT.io" target="_blank">https://JWT.io</a> and check your token above
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <Image
                className="mx-auto max-h-24 object-cover"
                src='/images/logo.png'
                alt="Logo"
              />

              <button
                onClick={auth.signinRedirect}
                type="button"
                className="flex w-full justify-center items-center rounded-md border border-transparent bg-orange-500 px-4 py-2 mt-8 text-base font-semibold text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                <ArrowLeftOnRectangleIcon
                  className="-ml-1 mr-3 h-5 w-5 min-w-[20px] min-h-[20px]"
                  aria-hidden="true"
                />
                Sign In with Amazon Cognito
              </button>
            </div>
          </div>
        </div>
      )}
      </>
    ); 
};

export default Home;
