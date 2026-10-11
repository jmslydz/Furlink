import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Modal, TextInput, Alert} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';
import ScreenIntro from '../components/ScreenIntro';
import ModeSwitch from '../components/ModeSwitch';
import {useMode} from '../context/ModeContext';
import ModeSwitch from '../components/ModeSwitch';
import {useMode} from '../context/ModeContext';
import ScheduleCard from '../components/ScheduleCard';

const DAYS_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const FeedingScheduleScreen = () => {
  const {isDemo}=useMode();
  const {isDemo}=useMode();
  const [schedules, setSchedules] = useState([
    {id: '1', time: '07:00 AM', amount: 1.5, days: [1, 2, 3, 4, 5], enabled: true},
    {id: '2', time: '06:00 PM', amount: 1.5, days: [1, 2, 3, 4, 5, 6, 7], enabled: true},
    {id: '3', time: '12:00 PM', amount: 1, days: [6, 7], enabled: false},
  ]);

  const [logs] = useState([
    {id: '1', time: '07:02 AM', date: 'May 14, 2026', amount: 1.5, type: 'Scheduled'},
    {id: '2', time: '06:01 PM', date: 'May 13, 2026', amount: 1.5, type: 'Scheduled'},
    {id: '3', time: '12:30 PM', date: 'May 13, 2026', amount: 0.5, type: 'Manual'},
    {id: '4', time: '07:00 AM', date: 'May 13, 2026', amount: 1.5, type: 'Scheduled'},
  ]);

  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formTime, setFormTime] = useState('08:00');
  const [formAmount, setFormAmount] = useState('1');
  const [formDays, setFormDays] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [formPeriod, setFormPeriod] = useState('AM');

  const openAdd = () => {
    if(!isDemo)return Alert.alert('Actual mode','Schedule editing is unavailable until hardware integration.');
    setEditId(null);
    setFormTime('08:00'); setFormAmount('1'); setFormDays([1, 2, 3, 4, 5, 6, 7]); setFormPeriod('AM');
    setModal(true);
  };

  const openEdit = (s) => {
    if(!isDemo)return;
    setEditId(s.id);
    const [t, p] = s.time.split(' ');
    setFormTime(t); setFormAmount(String(s.amount)); setFormDays(s.days); setFormPeriod(p);
    setModal(true);
  };

  const handleSave = () => {
    if (!isDemo) return Alert.alert('Actual mode','Device schedule synchronization is not connected.');
    if (!/^(0?[1-9]|1[0-2]):[0-5][0-9]$/.test(formTime.trim()) || !(parseFloat(formAmount)>0) || !formDays.length) return Alert.alert('Invalid schedule','Enter a valid 12-hour time, serving amount, and at least one day.');
    if(!isDemo)return Alert.alert('Actual mode','Connect and verify the Raspberry Pi before modifying real schedules.');
    const timeOk=/^(0?[1-9]|1[0-2]):[0-5][0-9]$/.test(formTime.trim());
    if(!timeOk||!Number.isFinite(Number(formAmount))||Number(formAmount)<=0||formDays.length===0)return Alert.alert('Invalid schedule','Choose a valid 12-hour time, positive servings, and at least one day.');
    if (editId) {
      setSchedules((p) => p.map((s) => s.id === editId ? {...s, time: `${formTime} ${formPeriod}`, amount: parseFloat(formAmount), days: formDays} : s));
    } else {
      setSchedules((p) => [...p, {id: String(Date.now()), time: `${formTime} ${formPeriod}`, amount: parseFloat(formAmount), days: formDays, enabled: true}]);
    }
    setModal(false);
  };

  const handleDelete = (id) => {
    if(!isDemo)return;
    Alert.alert('Delete Schedule', 'Are you sure?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Delete', style: 'destructive', onPress: () => setSchedules((p) => p.filter((s) => s.id !== id))},
    ]);
  };

  const toggleDay = (i) => setFormDays((p) => p.includes(i) ? p.filter((d) => d !== i) : [...p, i]);

  const activeCount = schedules.filter((s) => s.enabled).length;
  const totalServings = schedules.reduce((a, s) => a + (s.enabled ? s.amount : 0), 0);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenIntro title="Feeding Schedule" subtitle="Plan Snoopy’s meals" /><ModeSwitch /><ModeSwitch/>
        <Text style={styles.sub}>Local schedule preview — not synced to Raspberry Pi</Text>

        <View style={styles.summary}>
          {[
            ['Active', String(activeCount)],
            ['Servings', String(totalServings)],
            ['Mode', isDemo?'Demo':'Actual'],
          ].map(([l, v]) => (
            <View key={l} style={styles.summaryItem}>
              <Text style={styles.summaryVal}>{v}</Text>
              <Text style={styles.summaryLabel}>{l}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Scheduled Feedings</Text>
          <TouchableOpacity style={styles.addBtn} onPress={isDemo?openAdd:()=>Alert.alert('Actual mode','Schedule changes require verified hardware integration.')}>
            <Text style={styles.addBtnText}>+ Add</Text>
          </TouchableOpacity>
        </View>

        {!isDemo ? <View style={styles.empty}><Text style={styles.emptyTitle}>Actual schedules unavailable</Text><Text style={styles.emptyText}>Connect Raspberry Pi to load schedules.</Text></View> : schedules.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>⏰</Text>
            <Text style={styles.emptyTitle}>No schedules yet</Text>
            <Text style={styles.emptyText}>Tap "Add" to create one</Text>
          </View>
        ) : schedules.map((s) => (
          <ScheduleCard key={s.id} schedule={s} onToggle={(id, v) => !isDemo?Alert.alert('Actual mode','Device not connected.'):setSchedules((p) => p.map((x) => x.id === id ? {...x, enabled: v} : x))} onEdit={isDemo?openEdit:()=>Alert.alert('Actual mode','Device not connected.')} onDelete={isDemo?handleDelete:()=>Alert.alert('Actual mode','Device not connected.')} />
        ))}

        <Text style={[styles.sectionTitle, {marginTop: SIZES.padding}]}>Example history (not device logs)</Text>
        {isDemo && logs.map((l) => (
          <View key={l.id} style={styles.logItem}>
            <View style={styles.logLeft}>
              <View style={[styles.logIcon, {backgroundColor: l.type === 'Manual' ? COLORS.primary + '10' : COLORS.success + '10'}]}>
                <Text style={styles.logEmoji}>{l.type === 'Manual' ? '👆' : '🤖'}</Text>
              </View>
              <View>
                <Text style={styles.logType}>{l.type}</Text>
                <Text style={styles.logDate}>{l.date} · {l.time}</Text>
              </View>
            </View>
            <Text style={styles.logAmount}>{l.amount} serving{l.amount !== 1 ? 's' : ''}</Text>
          </View>
        ))}
      </ScrollView>

      <Modal visible={modal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{editId ? 'Edit Schedule' : 'New Schedule'}</Text>
              <TouchableOpacity onPress={() => setModal(false)}><Text style={styles.modalClose}>✕</Text></TouchableOpacity>
            </View>

            <Text style={styles.modalLabel}>Time</Text>
            <View style={styles.timeRow}>
              <TextInput style={styles.timeInput} value={formTime} onChangeText={setFormTime} placeholder="HH:MM" placeholderTextColor={COLORS.textTertiary} />
              <TouchableOpacity style={styles.periodBtn} onPress={() => setFormPeriod((p) => p === 'AM' ? 'PM' : 'AM')}>
                <Text style={styles.periodText}>{formPeriod}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLabel}>Servings</Text>
            <View style={styles.amtRow}>
              {[0.5, 1, 1.5, 2].map((a) => (
                <TouchableOpacity key={a} style={[styles.amtBtn, parseFloat(formAmount) === a && styles.amtBtnActive]} onPress={() => setFormAmount(String(a))}>
                  <Text style={[styles.amtBtnText, parseFloat(formAmount) === a && styles.amtBtnTextActive]}>{a}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.modalLabel}>Days</Text>
            <View style={styles.daysRow}>
              {DAYS_SHORT.map((d, i) => (
                <TouchableOpacity key={i} style={[styles.dayBtn, formDays.includes(i) && styles.dayBtnActive]} onPress={() => toggleDay(i)}>
                  <Text style={[styles.dayBtnText, formDays.includes(i) && styles.dayBtnTextActive]}>{d}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>{editId ? 'Update' : 'Add Schedule'}</Text>
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
  sub: {fontSize: SIZES.fontSm, color: COLORS.textTertiary, marginTop: 4, marginBottom: SIZES.padding},
  summary: {flexDirection: 'row', backgroundColor: COLORS.card, borderRadius: SIZES.radius, padding: SIZES.paddingSm, marginBottom: SIZES.padding, borderWidth: 1, borderColor: COLORS.cardBorder},
  summaryItem: {flex: 1, alignItems: 'center'},
  summaryVal: {fontSize: 22, fontWeight: '800', color: COLORS.primary},
  summaryLabel: {fontSize: 10, color: COLORS.textTertiary, textTransform: 'uppercase', marginTop: 2},
  sectionRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SIZES.marginSm},
  sectionTitle: {fontSize: SIZES.fontLg, fontWeight: '700', color: COLORS.text},
  addBtn: {backgroundColor: COLORS.primary, paddingHorizontal: 14, paddingVertical: 6, borderRadius: SIZES.radiusSm},
  addBtnText: {color: COLORS.textWhite, fontWeight: '700', fontSize: SIZES.fontSm},
  empty: {alignItems: 'center', padding: 40, backgroundColor: COLORS.card, borderRadius: SIZES.radiusSm, borderWidth: 1, borderColor: COLORS.cardBorder},
  emptyIcon: {fontSize: 40, marginBottom: 8},
  emptyTitle: {fontSize: SIZES.fontMd, fontWeight: '600', color: COLORS.text},
  emptyText: {fontSize: SIZES.fontSm, color: COLORS.textTertiary, marginTop: 4},
  logItem: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.card, padding: SIZES.paddingSm, marginBottom: 1, borderBottomWidth: 1, borderBottomColor: COLORS.divider},
  logLeft: {flexDirection: 'row', alignItems: 'center', gap: 10},
  logIcon: {width: 32, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center'},
  logEmoji: {fontSize: 14},
  logType: {fontSize: SIZES.fontSm, fontWeight: '500', color: COLORS.text},
  logDate: {fontSize: 10, color: COLORS.textTertiary, marginTop: 1},
  logAmount: {fontSize: SIZES.fontSm, fontWeight: '600', color: COLORS.primary},
  modalOverlay: {flex: 1, backgroundColor: COLORS.overlay, justifyContent: 'flex-end'},
  modalContainer: {backgroundColor: COLORS.card, borderTopLeftRadius: SIZES.radiusSm, borderTopRightRadius: SIZES.radiusSm, padding: SIZES.padding, paddingBottom: 40},
  modalHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SIZES.padding},
  modalTitle: {fontSize: SIZES.fontXl, fontWeight: '700', color: COLORS.text},
  modalClose: {fontSize: 20, color: COLORS.textTertiary},
  modalLabel: {fontSize: SIZES.fontXs, fontWeight: '600', color: COLORS.textSecondary, marginBottom: 6, marginTop: SIZES.margin, textTransform: 'uppercase', letterSpacing: 0.3},
  timeRow: {flexDirection: 'row', gap: 10},
  timeInput: {flex: 1, backgroundColor: COLORS.surface, borderRadius: SIZES.radiusXs, paddingHorizontal: 14, fontSize: 20, fontWeight: '700', color: COLORS.text, height: 48, borderWidth: 1, borderColor: COLORS.cardBorder},
  periodBtn: {width: 64, backgroundColor: COLORS.primary, borderRadius: SIZES.radiusXs, justifyContent: 'center', alignItems: 'center', height: 48},
  periodText: {fontSize: SIZES.fontMd, fontWeight: '700', color: COLORS.textWhite},
  amtRow: {flexDirection: 'row', gap: 8},
  amtBtn: {flex: 1, height: 44, borderRadius: SIZES.radiusXs, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.cardBorder},
  amtBtnActive: {backgroundColor: COLORS.primary, borderColor: COLORS.primary},
  amtBtnText: {fontSize: SIZES.fontMd, fontWeight: '700', color: COLORS.text},
  amtBtnTextActive: {color: COLORS.textWhite},
  daysRow: {flexDirection: 'row', gap: 6},
  dayBtn: {width: 38, height: 38, borderRadius: 19, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.cardBorder},
  dayBtnActive: {backgroundColor: COLORS.primary, borderColor: COLORS.primary},
  dayBtnText: {fontSize: SIZES.fontSm, fontWeight: '600', color: COLORS.text},
  dayBtnTextActive: {color: COLORS.textWhite},
  saveBtn: {backgroundColor: COLORS.primary, height: SIZES.btnHeight, borderRadius: SIZES.radiusXs, justifyContent: 'center', alignItems: 'center', marginTop: SIZES.padding},
  saveBtnText: {fontSize: SIZES.fontMd, fontWeight: '700', color: COLORS.textWhite},
});

export default FeedingScheduleScreen;
