import useStorage from '../hooks/useStorage';
import AuthContext from './AuthContext';

const AuthProvider = (props) => {
  const [token, setToken] = useStorage(localStorage, 'token');
  const [profile, setProfile] = useStorage(localStorage, 'profile', true);

  const handleLogin = async (login, password) => {
    const authResponse = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/auth`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: login,
          password: password,
        }),
      }
    );
    if (!authResponse.ok) {
      if (authResponse.status === 400) {
        const { message } = await authResponse.json();
        throw new Error(message);
      }
      throw new Error('Auth failed');
    }
    const { token } = await authResponse.json();
    setToken(token);

    const profileResponse = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/private/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!profileResponse.ok) {
      throw new Error(
        `${profileResponse.status} ${profileResponse.statusText}`
      );
    }

    const profile = await profileResponse.json();
    setProfile(profile);
  };

  const handleLogout = () => {
    setToken(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleLogout,
        token,
        profile,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
