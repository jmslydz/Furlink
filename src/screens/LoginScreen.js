import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';
import {useAuth} from '../context/AuthContext';
import AnimatedPup from '../components/AnimatedPup';

const LoginScreen = ({navigation}) => {
  const {signIn} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!email.trim()) return setError('Enter your email');
    if (!password.trim()) return setError('Enter your password');
    setLoading(true);
    const res = await signIn(email.toLowerCase().trim(), password);
    setLoading(false);
    if (!res.success) setError(res.error || 'Login failed');
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.top}>
          <AnimatedPup size={132} />
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.sub}>Sign in to Furlink</Text>
        </View>

        <View style={styles.form}>
          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorIcon}>⚠️</Text>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor={COLORS.textTertiary}
              value={email}
              onChangeText={(t) => {setEmail(t); setError('');}}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={COLORS.textTertiary}
              value={password}
              onChangeText={(t) => {setPassword(t); setError('');}}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={[styles.btn, loading && styles.btnDisabled]} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator size="small" color={COLORS.textWhite} /> : <Text style={styles.btnText}>Sign In</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.demoBtn} onPress={() => {setEmail('admin'); setPassword('1234');}}>
            <Text style={styles.demoText}>🔑 Use Demo Account</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.version}>v1.0.0 — Capstone Project</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: COLORS.background},
  container: {flexGrow: 1, justifyContent: 'center', padding: SIZES.padding},
  top: {alignItems: 'center', marginBottom: 28},
  logo: {
    width: 72, height: 72, borderRadius: 20,
    backgroundColor: COLORS.primary + '12',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 16,
  },
  logoIcon: {fontSize: 36},
  title: {fontSize: 28, fontWeight: '800', color: COLORS.text, letterSpacing: -0.5},
  sub: {fontSize: SIZES.fontSm, color: COLORS.textSecondary, marginTop: 4},
  form: {backgroundColor: 'transparent', borderRadius: SIZES.radiusSm, padding: SIZES.padding, borderWidth: 0},
  errorBox: {flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.danger + '08', padding: 10, borderRadius: SIZES.radiusXs, marginBottom: SIZES.margin},
  errorIcon: {fontSize: 14, marginRight: 8},
  errorText: {flex: 1, fontSize: SIZES.fontSm, color: COLORS.danger, fontWeight: '500'},
  inputGroup: {marginBottom: SIZES.margin},
  label: {fontSize: SIZES.fontXs, fontWeight: '600', color: COLORS.textSecondary, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.3},
  input: {
    backgroundColor: COLORS.surface, borderRadius: SIZES.radiusXs,
    height: SIZES.inputHeight, paddingHorizontal: 14,
    fontSize: SIZES.fontMd, color: COLORS.text,
    borderWidth: 1, borderColor: COLORS.cardBorder,
  },
  btn: {
    backgroundColor: COLORS.primaryDark, height: SIZES.btnHeight,
    borderRadius: 25, justifyContent: 'center', alignItems: 'center',
    marginTop: SIZES.marginSm,
  },
  btnDisabled: {opacity: 0.6},
  btnText: {fontSize: SIZES.fontMd, fontWeight: '700', color: COLORS.textWhite},
  demoBtn: {marginTop: SIZES.marginSm, height: 42, borderRadius: SIZES.radiusXs, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.cardBorder},
  demoText: {fontSize: SIZES.fontSm, color: COLORS.textSecondary, fontWeight: '600'},
  footer: {flexDirection: 'row', justifyContent: 'center', marginTop: SIZES.padding},
  footerText: {fontSize: SIZES.fontSm, color: COLORS.textTertiary},
  footerLink: {fontSize: SIZES.fontSm, color: COLORS.primary, fontWeight: '700'},
  version: {fontSize: 10, color: COLORS.textTertiary, textAlign: 'center', marginTop: SIZES.padding},
});

export default LoginScreen;
