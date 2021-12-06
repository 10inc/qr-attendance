import React from 'react';
import {useToast} from 'react-native-paper-toast';
import { Button, Headline, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import {useNavigate} from 'react-router-native';

import {useAuth} from '../auth';

const Login = () => {
  const toaster = useToast();
  const {status, userToken, signIn, signOut} = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    signIn(email, password)
      .then(toaster.show({message: 'Login successful', duration: 2000}))
      .catch(toaster.show({message: 'Login successful', duration: 2000}));
  };

  // Tech Debt: useContext and useMemo should re-render... this is a quick fix
  React.useEffect(() => {
    console.log('login', userToken);
    if (userToken) {
      navigate('/');
    }
  }, [userToken, navigate]);

  return (
    <View style={styles.container}>
      <Headline style={styles.header}>Student Seminar QR System</Headline>
      <View style={styles.content}>
        <TextInput
          label="Email"
          onChangeText={value => setEmail(value)}
          placeholder="Enter your email address"
          value={email}
        />
        <TextInput
          secureTextEntry={true}
          onChangeText={value => setPassword(value)}
          placeholder="Enter your password"
        />
        <View>
          <Button mode="contained" onPress={handleLogin} style={styles.input}>
            LOG IN
          </Button>
          <Button mode="contained" onPress={signOut} style={styles.input}>
            LOG OUT
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 'large',
  },
  input: {
    height: 40,
    margin: 10,
    justifyContent: 'center',
  },
  container: {
    marginTop: 50,
  },
  content: {
    marginLeft: '15%',
    marginRight: '15%',
  },
  red: {
    color: 'red',
  },
});

export default Login;
