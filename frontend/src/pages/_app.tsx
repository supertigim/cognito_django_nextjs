import { AuthProvider } from 'react-oidc-context'
import '/src/styles/index.css';


const oidcConfig = {
  authority: `https://cognito-idp.${process.env.NEXT_PUBLIC_COGNITO_REGION}.amazonaws.com/${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}`,
  client_id: `${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}`,
  redirect_uri: 'http://localhost:3005',
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
};

function App({ Component, pageProps, session }: any) {
    return (
        <AuthProvider {...oidcConfig}>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default App;
