import React from 'react';
import {useToast} from 'react-native-paper-toast';
import {TextInput} from 'react-native-paper';
import {Text, View, Button} from 'react-native';
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
    <View>
      <TextInput
        label="Email"
        value={email}
        onChangeText={value => setEmail(value)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={value => setPassword(value)}
      />
      <Text>status : {status}</Text>
      <Text>userToken : {userToken ? userToken : 'null'}</Text>
      <View>
        <Button title="Log IN" onPress={handleLogin} />
        <Button title="Log Out" onPress={signOut} />
      </View>
    </View>
  );
};

export default Login;
