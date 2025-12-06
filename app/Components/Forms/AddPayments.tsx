import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
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

const ChevronDownIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </Svg>
);

const UserIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
  </Svg>
);

const CurrencyIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </Svg>
);

const CalendarIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </Svg>
);

const NoteIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </Svg>
);

const CheckIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2.5}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </Svg>
);

const CloseIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </Svg>
);

const SearchIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </Svg>
);

type Member = { id: string; name: string; email: string; pending: number; plan: string };
type PaymentMethod = 'Cash' | 'Card' | 'UPI' | 'Bank';

export default function AddPayments() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    member: null as Member | null,
    amount: '',
    method: 'Cash' as PaymentMethod,
    date: '',
    note: '',
  });

  const members: Member[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@email.com', pending: 150, plan: 'Premium' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@email.com', pending: 200, plan: 'Basic' },
    { id: '3', name: 'Mike Johnson', email: 'mike.j@email.com', pending: 150, plan: 'Premium' },
    { id: '4', name: 'Sarah Wilson', email: 'sarah.w@email.com', pending: 100, plan: 'VIP' },
    { id: '5', name: 'Alex Chen', email: 'alex.c@email.com', pending: 250, plan: 'Basic' },
  ];

  const paymentMethods: PaymentMethod[] = ['Cash', 'Card', 'UPI', 'Bank'];

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  const selectMember = (member: Member) => {
    setForm(prev => ({ ...prev, member, amount: member.pending.toString() }));
    setShowDropdown(false);
    setSearch('');
  };

  const updateForm = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('');

  const handleSubmit = () => {
    console.log('Payment submitted:', form);
  };

  return (
    <View style={styles.container}>
      {/* Header */}


      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

          {/* Select Member */}
          <Text style={styles.sectionTitle}>Select Member</Text>
          <TouchableOpacity style={styles.dropdown} onPress={() => setShowDropdown(true)} activeOpacity={0.7}>
            {form.member ? (
              <View style={styles.selectedMember}>
                <LinearGradient colors={['#f97316', '#ea580c']} style={styles.miniAvatar}>
                  <Text style={styles.miniAvatarText}>{getInitials(form.member.name)}</Text>
                </LinearGradient>
                <View style={styles.selectedInfo}>
                  <Text style={styles.selectedName}>{form.member.name}</Text>
                  <Text style={styles.selectedMeta}>{form.member.plan} • ${form.member.pending} pending</Text>
                </View>
              </View>
            ) : (
              <View style={styles.placeholderRow}>
                <View style={styles.inputIcon}><UserIcon /></View>
                <Text style={styles.placeholderText}>Choose a member</Text>
              </View>
            )}
            <ChevronDownIcon />
          </TouchableOpacity>

          {/* Member Info Card (shown when selected) */}
          {form.member && (
            <View style={styles.memberCard}>
              <View style={styles.memberCardRow}>
                <Text style={styles.memberCardLabel}>Plan</Text>
                <Text style={styles.memberCardValue}>{form.member.plan}</Text>
              </View>
              <View style={styles.memberCardRow}>
                <Text style={styles.memberCardLabel}>Pending Amount</Text>
                <Text style={[styles.memberCardValue, { color: '#ef4444' }]}>${form.member.pending}</Text>
              </View>
            </View>
          )}

          {/* Payment Details */}
          <Text style={styles.sectionTitle}>Payment Details</Text>
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
                placeholder="Date (DD/MM/YYYY)"
                placeholderTextColor="#6b7280"
                value={form.date}
                onChangeText={(v) => updateForm('date', v)}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.inputRow}>
              <View style={styles.inputIcon}><NoteIcon /></View>
              <TextInput
                style={styles.input}
                placeholder="Note (optional)"
                placeholderTextColor="#6b7280"
                value={form.note}
                onChangeText={(v) => updateForm('note', v)}
              />
            </View>
          </View>

          {/* Payment Method */}
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.methodRow}>
            {paymentMethods.map(method => (
              <TouchableOpacity
                key={method}
                style={[styles.methodBtn, form.method === method && styles.methodBtnActive]}
                onPress={() => updateForm('method', method)}>
                <Text style={[styles.methodText, form.method === method && styles.methodTextActive]}>{method}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Summary */}
          {form.member && form.amount && (
            <>
              <Text style={styles.sectionTitle}>Summary</Text>
              <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Member</Text>
                  <Text style={styles.summaryValue}>{form.member.name}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Amount</Text>
                  <Text style={[styles.summaryValue, { color: '#10b981' }]}>${form.amount}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Method</Text>
                  <Text style={styles.summaryValue}>{form.method}</Text>
                </View>
                <View style={[styles.summaryRow, { borderBottomWidth: 0 }]}>
                  <Text style={styles.summaryLabel}>Remaining</Text>
                  <Text style={[styles.summaryValue, { color: Number(form.amount) >= form.member.pending ? '#10b981' : '#ef4444' }]}>
                    ${Math.max(0, form.member.pending - Number(form.amount))}
                  </Text>
                </View>
              </View>
            </>
          )}

          <View style={{ height: 120 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.8}>
          <LinearGradient colors={['#10b981', '#059669']} style={styles.submitGradient}>
            <Text style={styles.submitText}>Record Payment</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Member Selection Modal */}
      <Modal visible={showDropdown} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Member</Text>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setShowDropdown(false)}>
                <CloseIcon />
              </TouchableOpacity>
            </View>

            {/* Search */}
            <View style={styles.searchBox}>
              <SearchIcon />
              <TextInput
                style={styles.searchInput}
                placeholder="Search members..."
                placeholderTextColor="#6b7280"
                value={search}
                onChangeText={setSearch}
              />
            </View>

            {/* Members List */}
            <ScrollView style={styles.membersList}>
              {filteredMembers.map(member => (
                <TouchableOpacity
                  key={member.id}
                  style={styles.memberOption}
                  onPress={() => selectMember(member)}>
                  <LinearGradient colors={['#f97316', '#ea580c']} style={styles.optionAvatar}>
                    <Text style={styles.optionAvatarText}>{getInitials(member.name)}</Text>
                  </LinearGradient>
                  <View style={styles.optionInfo}>
                    <Text style={styles.optionName}>{member.name}</Text>
                    <Text style={styles.optionMeta}>{member.plan} • ${member.pending} pending</Text>
                  </View>
                  {form.member?.id === member.id && <CheckIcon />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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

  // Section
  sectionTitle: { fontSize: 13, fontWeight: '600', color: '#6b7280', marginTop: 24, marginBottom: 12, marginLeft: 4, textTransform: 'uppercase', letterSpacing: 0.5 },

  // Dropdown
  dropdown: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#151515', borderRadius: 14, padding: 14 },
  placeholderRow: { flexDirection: 'row', alignItems: 'center' },
  placeholderText: { fontSize: 15, color: '#6b7280', marginLeft: 12 },
  inputIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
  selectedMember: { flexDirection: 'row', alignItems: 'center' },
  miniAvatar: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  miniAvatarText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  selectedInfo: { marginLeft: 12 },
  selectedName: { fontSize: 15, fontWeight: '600', color: '#fff' },
  selectedMeta: { fontSize: 12, color: '#6b7280', marginTop: 2 },

  // Member Card
  memberCard: { backgroundColor: '#151515', borderRadius: 14, padding: 14, marginTop: 12 },
  memberCardRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  memberCardLabel: { fontSize: 14, color: '#6b7280' },
  memberCardValue: { fontSize: 14, fontWeight: '600', color: '#fff' },

  // Card
  card: { backgroundColor: '#151515', borderRadius: 16, overflow: 'hidden' },
  inputRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, height: 54 },
  input: { flex: 1, marginLeft: 12, fontSize: 15, color: '#fff' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginLeft: 62 },

  // Methods
  methodRow: { flexDirection: 'row', gap: 10 },
  methodBtn: { flex: 1, backgroundColor: '#151515', borderRadius: 12, paddingVertical: 14, alignItems: 'center', borderWidth: 1.5, borderColor: 'transparent' },
  methodBtnActive: { borderColor: '#f97316', backgroundColor: 'rgba(249, 115, 22, 0.1)' },
  methodText: { fontSize: 14, fontWeight: '600', color: '#6b7280' },
  methodTextActive: { color: '#f97316' },

  // Summary
  summaryCard: { backgroundColor: '#151515', borderRadius: 14, padding: 4 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  summaryLabel: { fontSize: 14, color: '#6b7280' },
  summaryValue: { fontSize: 14, fontWeight: '600', color: '#fff' },

  // Footer
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, paddingBottom: 32, backgroundColor: '#0a0a0a', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  submitBtn: { borderRadius: 14, overflow: 'hidden' },
  submitGradient: { paddingVertical: 16, alignItems: 'center' },
  submitText: { fontSize: 16, fontWeight: '700', color: '#fff' },

  // Modal
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  modal: { backgroundColor: '#151515', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#fff' },
  closeBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0a0a0a', marginHorizontal: 16, marginVertical: 12, borderRadius: 12, paddingHorizontal: 14, height: 46 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15, color: '#fff' },
  membersList: { paddingHorizontal: 16, paddingBottom: 32 },
  memberOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  optionAvatar: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  optionAvatarText: { fontSize: 15, fontWeight: '700', color: '#fff' },
  optionInfo: { flex: 1, marginLeft: 12 },
  optionName: { fontSize: 15, fontWeight: '600', color: '#fff' },
  optionMeta: { fontSize: 12, color: '#6b7280', marginTop: 2 },
});