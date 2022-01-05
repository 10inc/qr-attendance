import React from 'react';
import { StyleSheet } from 'react-native';
import { useToast } from 'react-native-paper-toast';
import { Surface, Button, Title, TextInput } from 'react-native-paper';
import { useNavigate } from 'react-router-native';

import { useAuth } from '../auth';

const Login = () => {
  const toaster = useToast();
  const {status, userToken, signIn, signOut} = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    signIn(email, password)
      .then((res) => {
        toaster.show({ message: "Login Successful", duration: 2000, type:"success" })
      })
      .catch((err) => {
        toaster.show({ message: JSON.stringify(err), duration: 2000, type: 'error'})
      });
  };

  // Tech Debt: useContext and useMemo should re-render... this is a quick fix
  React.useEffect(() => {
    console.log('login', userToken);
    if (userToken) {
      navigate('/');
    }
  }, [userToken, navigate]);

  return (
    <Surface style={styles.surface}>
      <Title>Student Seminar QR System</Title>
      <TextInput
        label="Email"
        value={email}
        onChangeText={value => setEmail(value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={value => setPassword(value)}
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
      >
        Log In
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: {
    paddingTop: 96,
    paddingLeft: 24,
    paddingRight: 24,
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  input: {
    width: '100%',
    margin: 8,
  },
  button: {
    width: '100%',
    margin: 8,
    padding: 4,
  }
});

export default Login;
