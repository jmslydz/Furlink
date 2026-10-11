import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Switch, Alert, Modal, TextInput} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';
import ScreenIntro from '../components/ScreenIntro';
import {useAuth} from '../context/AuthContext';

const SettingsScreen = ({navigation}) => {
  const {user, signOut} = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [vibrate, setVibrate] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profileName, setProfileName] = useState(user?.displayName || '');

  const sections = [
    {title: 'Notifications', icon: '🔔', items: [
      {icon: '📱', label: 'Push Notifications', type: 'switch', value: notifications, onChange: setNotifications},
      {icon: '🔊', label: 'Sound Alerts', type: 'switch', value: sound, onChange: setSound},
      {icon: '📳', label: 'Vibration', type: 'switch', value: vibrate, onChange: setVibrate},
    ]},
    {title: 'Device', icon: '⚙️', items: [
      {icon: '🏠', label: 'Connected Device', type: 'info', value: 'Raspberry Pi 4 (pending)'},
      {icon: '🔧', label: 'Device Settings', type: 'link', onPress: () => navigation.navigate('DeviceStatus')},
      {icon: '📲', label: 'Firmware', type: 'info', value: 'Not connected'},
    ]},
    {title: 'Support', icon: '💬', items: [
      {icon: '❓', label: 'Help Center', type: 'link', onPress: () => Alert.alert('Help', 'Help center coming soon.')},
      {icon: '🐛', label: 'Report Issue', type: 'link', onPress: () => Alert.alert('Report', 'Report form coming soon.')},
      {icon: 'ℹ️', label: 'Version', type: 'info', value: 'v1.0.0'},
    ]},
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenIntro title="Settings" subtitle="Make Furlink yours" />
        <Text style={styles.sub}>Customize your experience</Text>

        <TouchableOpacity style={styles.profile} onPress={() => {setProfileName(user?.displayName || ''); setShowProfile(true);}}>
          <View style={styles.avatar}>
            <Text style={styles.avatarIcon}>🐕</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.profileName}>{user?.displayName || 'Pet Owner'}</Text>
            <Text style={styles.profileEmail}>{user?.email || ''}</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {sections.map((sec) => (
          <View key={sec.title} style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Text style={{fontSize: 12}}>{sec.icon}</Text>{' '}
              {sec.title}
            </Text>
            <View style={styles.sectionBody}>
              {sec.items.map((item, i) => (
                <TouchableOpacity key={i} style={[styles.settingItem, i === sec.items.length - 1 && styles.lastItem]} onPress={item.onPress} disabled={item.type === 'switch' || item.type === 'info'} activeOpacity={0.6}>
                  <View style={styles.settingLeft}>
                    <Text style={styles.settingIcon}>{item.icon}</Text>
                    <Text style={styles.settingLabel}>{item.label}</Text>
                  </View>
                  {item.type === 'switch' ? (
                    <Switch value={item.value} onValueChange={item.onChange} trackColor={{false: COLORS.divider, true: COLORS.primary + '40'}} thumbColor={item.value ? COLORS.primary : COLORS.textTertiary} />
                  ) : item.type === 'info' ? (
                    <Text style={styles.settingValue}>{item.value}</Text>
                  ) : (
                    <Text style={styles.arrow}>›</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.logoutBtn} onPress={() => setShowLogout(true)}>
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Smart Dog Care</Text>
          <Text style={styles.footerSub}>IoT Dog Cage Monitoring System</Text>
          <Text style={styles.footerVer}>Built with React Native + Firebase</Text>
        </View>
      </ScrollView>

      <Modal visible={showLogout} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={{fontSize: 40, textAlign: 'center', marginBottom: 10}}>🚪</Text>
            <Text style={styles.modalTitle}>Sign Out</Text>
            <Text style={styles.modalText}>You'll need to sign in again to access your device.</Text>
            <View style={styles.modalBtns}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setShowLogout(false)}><Text style={styles.modalCancelText}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirm} onPress={() => {setShowLogout(false); signOut();}}><Text style={styles.modalConfirmText}>Sign Out</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showProfile} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, {paddingBottom: 30}]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SIZES.padding}}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setShowProfile(false)}><Text style={{fontSize: 20, color: COLORS.textTertiary}}>✕</Text></TouchableOpacity>
            </View>
            <Text style={[styles.modalLabel, {marginTop: 0}]}>Display Name</Text>
            <TextInput style={styles.profileInput} value={profileName} onChangeText={setProfileName} placeholder="Your name" placeholderTextColor={COLORS.textTertiary} />
            <Text style={styles.modalLabel}>Email</Text>
            <TextInput style={[styles.profileInput, {opacity: 0.6}]} value={user?.email || ''} editable={false} />
            <TouchableOpacity style={styles.saveBtn} onPress={() => {Alert.alert('Updated', 'Profile saved (demo)'); setShowProfile(false);}}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: COLORS.background},
  content: {padding: SIZES.padding, paddingBottom: 100},
  title: {fontSize: 24, fontWeight: '700', color: COLORS.text, letterSpacing: -0.3},
  sub: {fontSize: SIZES.fontSm, color: COLORS.textTertiary, marginTop: 2, marginBottom: SIZES.padding},
  profile: {flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: SIZES.radius, padding: SIZES.paddingSm, borderWidth: 1, borderColor: COLORS.cardBorder, marginBottom: SIZES.padding},
  avatar: {width: 48, height: 48, borderRadius: 12, backgroundColor: COLORS.primary + '12', justifyContent: 'center', alignItems: 'center', marginRight: SIZES.paddingSm},
  avatarIcon: {fontSize: 24},
  profileName: {fontSize: SIZES.fontLg, fontWeight: '700', color: COLORS.text},
  profileEmail: {fontSize: SIZES.fontXs, color: COLORS.textTertiary, marginTop: 1},
  arrow: {fontSize: 22, color: COLORS.textTertiary},
  section: {marginBottom: SIZES.margin},
  sectionTitle: {fontSize: SIZES.fontXs, fontWeight: '700', color: COLORS.textTertiary, textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 6, paddingLeft: 2},
  sectionBody: {backgroundColor: COLORS.card, borderRadius: SIZES.radiusSm, borderWidth: 1, borderColor: COLORS.cardBorder},
  settingItem: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, paddingHorizontal: SIZES.paddingSm, borderBottomWidth: 1, borderBottomColor: COLORS.divider},
  lastItem: {borderBottomWidth: 0},
  settingLeft: {flexDirection: 'row', alignItems: 'center', gap: 10},
  settingIcon: {fontSize: 16, width: 22, textAlign: 'center'},
  settingLabel: {fontSize: SIZES.fontMd, color: COLORS.text, fontWeight: '500'},
  settingValue: {fontSize: SIZES.fontSm, color: COLORS.textTertiary},
  logoutBtn: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: COLORS.danger + '08', borderRadius: SIZES.radiusSm, padding: SIZES.paddingSm, borderWidth: 1, borderColor: COLORS.danger + '20', marginTop: SIZES.margin},
  logoutIcon: {fontSize: 16},
  logoutText: {fontSize: SIZES.fontMd, fontWeight: '600', color: COLORS.danger},
  footer: {alignItems: 'center', paddingVertical: SIZES.padding},
  footerTitle: {fontSize: SIZES.fontMd, fontWeight: '700', color: COLORS.text},
  footerSub: {fontSize: SIZES.fontXs, color: COLORS.textTertiary, marginTop: 2},
  footerVer: {fontSize: 10, color: COLORS.textTertiary, marginTop: 6, fontStyle: 'italic'},
  modalOverlay: {flex: 1, backgroundColor: COLORS.overlay, justifyContent: 'center', alignItems: 'center', padding: SIZES.padding},
  modalContainer: {backgroundColor: COLORS.card, borderRadius: SIZES.radiusSm, padding: SIZES.padding, width: '100%', maxWidth: 340},
  modalTitle: {fontSize: SIZES.fontXl, fontWeight: '700', color: COLORS.text},
  modalText: {fontSize: SIZES.fontSm, color: COLORS.textSecondary, textAlign: 'center', marginTop: 8},
  modalBtns: {flexDirection: 'row', gap: 10, marginTop: SIZES.padding},
  modalCancel: {flex: 1, height: 42, borderRadius: SIZES.radiusSm, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.cardBorder},
  modalCancelText: {fontSize: SIZES.fontSm, fontWeight: '600', color: COLORS.text},
  modalConfirm: {flex: 1, height: 42, borderRadius: SIZES.radiusXs, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.danger},
  modalConfirmText: {fontSize: SIZES.fontSm, fontWeight: '700', color: COLORS.textWhite},
  modalLabel: {fontSize: SIZES.fontXs, fontWeight: '600', color: COLORS.textSecondary, marginTop: SIZES.margin, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.3},
  profileInput: {backgroundColor: COLORS.surface, borderRadius: SIZES.radiusXs, height: 44, paddingHorizontal: 12, fontSize: SIZES.fontMd, color: COLORS.text, borderWidth: 1, borderColor: COLORS.cardBorder},
  saveBtn: {backgroundColor: COLORS.primary, height: SIZES.btnHeight, borderRadius: SIZES.radiusXs, justifyContent: 'center', alignItems: 'center', marginTop: SIZES.padding},
  saveBtnText: {fontSize: SIZES.fontMd, fontWeight: '700', color: COLORS.textWhite},
});

export default SettingsScreen;
