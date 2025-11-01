import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Grayscale, MainColors } from '../../constants/theme';
import { RootStackParamList } from '../../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Lógica de autenticação aqui
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Section - Branding */}
        <View style={styles.topSection}>
          <View style={styles.branding}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.textContainer}>
              <Text style={styles.brandText}>REMEMBER</Text>
              <Text style={styles.brandText}>MED</Text>
            </View>
          </View>
        </View>

        {/* Bottom Section - Login Form */}
        <View style={styles.bottomSection}>
          <Text style={styles.title}>Entre para acessar suas receitas</Text>

          {/* Email Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="email@exemplo.com"
              placeholderTextColor={Grayscale.gray400}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Senha"
                placeholderTextColor={Grayscale.gray400}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}>
                {showPassword ? (
                  <EyeOff color={MainColors.darkBlueBase} size={20} />
                ) : (
                  <Eye color={MainColors.darkBlueBase} size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: MainColors.teal,
  },
  container: {
    flex: 1,
  },
  topSection: {
    flex: 0.4,
    backgroundColor: MainColors.teal,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  branding: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  textContainer: {
    justifyContent: 'center',
  },
  brandText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.light.white,
    letterSpacing: 1,
    lineHeight: 38,
  },
  bottomSection: {
    flex: 0.6,
    backgroundColor: Colors.light.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Grayscale.gray100,
    marginBottom: 32,
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Grayscale.gray100,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: Grayscale.gray500,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Grayscale.gray100,
    backgroundColor: Colors.light.white,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Grayscale.gray500,
    borderRadius: 8,
    backgroundColor: Colors.light.white,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Grayscale.gray100,
  },
  eyeIcon: {
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: MainColors.teal,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: Colors.light.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

