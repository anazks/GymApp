import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Path, Svg } from 'react-native-svg';

// Icons
const BackIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </Svg>
);

const UserIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
  </Svg>
);

const EmailIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </Svg>
);

const PhoneIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </Svg>
);

const CalendarIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </Svg>
);

const CurrencyIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </Svg>
);

const CheckIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </Svg>
);

type Plan = 'Basic' | 'Premium' | 'VIP';

export default function AddMember() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'Basic' as Plan,
    duration: '1',
    amount: '',
  });

  const plans: Plan[] = ['Basic', 'Premium', 'VIP'];
  const durations = [
    { value: '1', label: '1 Month' },
    { value: '3', label: '3 Months' },
    { value: '6', label: '6 Months' },
    { value: '12', label: '1 Year' },
  ];

  const updateForm = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', form);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          
          {/* Avatar Placeholder */}
          <View style={styles.avatarSection}>
            <LinearGradient colors={['#f97316', '#ea580c']} style={styles.avatar}>
              <Text style={styles.avatarText}>
                {form.name ? form.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?'}
              </Text>
            </LinearGradient>
            <Text style={styles.avatarHint}>Photo auto-generated from name</Text>
          </View>

          {/* Personal Info Section */}
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.card}>
            <View style={styles.inputRow}>
              <View style={styles.inputIcon}><UserIcon /></View>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#6b7280"
                value={form.name}
                onChangeText={(v) => updateForm('name', v)}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.inputRow}>
              <View style={styles.inputIcon}><EmailIcon /></View>
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#6b7280"
                keyboardType="email-address"
                autoCapitalize="none"
                value={form.email}
                onChangeText={(v) => updateForm('email', v)}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.inputRow}>
              <View style={styles.inputIcon}><PhoneIcon /></View>
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#6b7280"
                keyboardType="phone-pad"
                value={form.phone}
                onChangeText={(v) => updateForm('phone', v)}
              />
            </View>
          </View>

          {/* Membership Plan */}
          <Text style={styles.sectionTitle}>Membership Plan</Text>
          <View style={styles.planRow}>
            {plans.map(plan => (
              <TouchableOpacity
                key={plan}
                style={[styles.planBtn, form.plan === plan && styles.planBtnActive]}
                onPress={() => updateForm('plan', plan)}>
                {form.plan === plan && (
                  <View style={styles.planCheck}><CheckIcon /></View>
                )}
                <Text style={[styles.planText, form.plan === plan && styles.planTextActive]}>{plan}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Duration */}
          <Text style={styles.sectionTitle}>Duration</Text>
          <View style={styles.durationRow}>
            {durations.map(d => (
              <TouchableOpacity
                key={d.value}
                style={[styles.durationBtn, form.duration === d.value && styles.durationBtnActive]}
                onPress={() => updateForm('duration', d.value)}>
                <Text style={[styles.durationText, form.duration === d.value && styles.durationTextActive]}>
                  {d.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Payment */}
          <Text style={styles.sectionTitle}>Payment</Text>
          <View style={styles.card}>
            <View style={styles.inputRow}>
              <View style={styles.inputIcon}><CurrencyIcon /></View>
              <TextInput
                style={styles.input}
                placeholder="Amount"
                placeholderTextColor="#6b7280"
                keyboardType="numeric"
                value={form.amount}
                onChangeText={(v) => updateForm('amount', v)}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.inputRow}>
              <View style={styles.inputIcon}><CalendarIcon /></View>
              <TextInput
                style={styles.input}
                placeholder="Start Date (DD/MM/YYYY)"
                placeholderTextColor="#6b7280"
              />
            </View>
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>
      </KeyboardAvoidingView>
      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.8}>
          <LinearGradient colors={['#f97316', '#ea580c']} style={styles.submitGradient}>
            <Text style={styles.submitText}>Add Member</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 56, paddingBottom: 20, paddingHorizontal: 16, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#fff' },

  scroll: { flex: 1, paddingHorizontal: 16 },

  // Avatar
  avatarSection: { alignItems: 'center', marginTop: 24, marginBottom: 8 },
  avatar: { width: 80, height: 80, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 28, fontWeight: '700', color: '#fff' },
  avatarHint: { fontSize: 12, color: '#6b7280', marginTop: 10 },

  // Section
  sectionTitle: { fontSize: 13, fontWeight: '600', color: '#6b7280', marginTop: 24, marginBottom: 12, marginLeft: 4, textTransform: 'uppercase', letterSpacing: 0.5 },

  // Card
  card: { backgroundColor: '#151515', borderRadius: 16, overflow: 'hidden' },
  inputRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, height: 54 },
  inputIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
  input: { flex: 1, marginLeft: 12, fontSize: 15, color: '#fff' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginLeft: 62 },

  // Plans
  planRow: { flexDirection: 'row', gap: 10 },
  planBtn: { flex: 1, backgroundColor: '#151515', borderRadius: 14, paddingVertical: 16, alignItems: 'center', borderWidth: 1.5, borderColor: 'transparent' },
  planBtnActive: { borderColor: '#f97316', backgroundColor: 'rgba(249, 115, 22, 0.1)' },
  planCheck: { position: 'absolute', top: 8, right: 8, width: 20, height: 20, borderRadius: 10, backgroundColor: '#f97316', justifyContent: 'center', alignItems: 'center' },
  planText: { fontSize: 15, fontWeight: '600', color: '#6b7280' },
  planTextActive: { color: '#f97316' },

  // Duration
  durationRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  durationBtn: { paddingHorizontal: 18, paddingVertical: 12, backgroundColor: '#151515', borderRadius: 12, borderWidth: 1.5, borderColor: 'transparent' },
  durationBtnActive: { borderColor: '#f97316', backgroundColor: 'rgba(249, 115, 22, 0.1)' },
  durationText: { fontSize: 14, fontWeight: '600', color: '#6b7280' },
  durationTextActive: { color: '#f97316' },

  // Footer
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, paddingBottom: 32, backgroundColor: '#0a0a0a', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  submitBtn: { borderRadius: 14, overflow: 'hidden' },
  submitGradient: { paddingVertical: 16, alignItems: 'center' },
  submitText: { fontSize: 16, fontWeight: '700', color: '#fff' },
});