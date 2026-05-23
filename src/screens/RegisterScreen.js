import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';
import {useAuth} from '../context/AuthContext';

const RegisterScreen = ({navigation}) => {
  const {signUp} = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');
    if (!name.trim()) return setError('Enter your name');
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return setError('Enter a valid email');
    if (password.length < 6) return setError('Password must be 6+ characters');
    if (password !== confirm) return setError('Passwords do not match');
    setLoading(true);
    const res = await signUp(email.toLowerCase().trim(), password, name.trim());
    setLoading(false);
    if (!res.success) setError(res.error || 'Registration failed');
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.form}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.sub}>Sign up to start monitoring your dog</Text>

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorIcon}>⚠️</Text>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput style={styles.input} placeholder="Juan Dela Cruz" placeholderTextColor={COLORS.textTertiary} value={name} onChangeText={setName} autoCapitalize="words" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="you@email.com" placeholderTextColor={COLORS.textTertiary} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} placeholder="At least 6 characters" placeholderTextColor={COLORS.textTertiary} value={password} onChangeText={setPassword} secureTextEntry />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput style={styles.input} placeholder="Re-enter password" placeholderTextColor={COLORS.textTertiary} value={confirm} onChangeText={setConfirm} secureTextEntry />
          </View>

          <TouchableOpacity style={[styles.btn, loading && styles.btnDisabled]} onPress={handleRegister} disabled={loading}>
            {loading ? <ActivityIndicator size="small" color={COLORS.textWhite} /> : <Text style={styles.btnText}>Create Account</Text>}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: COLORS.background},
  container: {flexGrow: 1, padding: SIZES.padding, justifyContent: 'center'},
  form: {backgroundColor: COLORS.card, borderRadius: SIZES.radiusSm, padding: SIZES.padding, borderWidth: 1, borderColor: COLORS.cardBorder},
  title: {fontSize: 24, fontWeight: '700', color: COLORS.text},
  sub: {fontSize: SIZES.fontSm, color: COLORS.textTertiary, marginTop: 4, marginBottom: SIZES.padding},
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
    backgroundColor: COLORS.primary, height: SIZES.btnHeight,
    borderRadius: SIZES.radiusXs, justifyContent: 'center', alignItems: 'center',
    marginTop: SIZES.marginSm,
  },
  btnDisabled: {opacity: 0.6},
  btnText: {fontSize: SIZES.fontMd, fontWeight: '700', color: COLORS.textWhite},
  footer: {flexDirection: 'row', justifyContent: 'center', marginTop: SIZES.padding},
  footerText: {fontSize: SIZES.fontSm, color: COLORS.textTertiary},
  footerLink: {fontSize: SIZES.fontSm, color: COLORS.primary, fontWeight: '700'},
});

export default RegisterScreen;
