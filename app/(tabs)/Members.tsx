import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Path, Svg } from 'react-native-svg';

// Minimal Icons
const SearchIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </Svg>
);

const PhoneIcon = ({ color = '#10b981' }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </Svg>
);

const BellIcon = ({ color = '#f97316' }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </Svg>
);

const CloseIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </Svg>
);

const PlusIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </Svg>
);

export default function Members() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<any>(null);

  const filters = ['All', 'Active', 'Expired'];

  const members = [
    { id: '1', name: 'John Doe', phone: '+1 234 567 890', status: 'Active', plan: 'Premium', expiry: 'Jan 15, 2025' },
    { id: '2', name: 'Jane Smith', phone: '+1 234 567 891', status: 'Active', plan: 'Basic', expiry: 'Mar 20, 2025' },
    { id: '3', name: 'Mike Johnson', phone: '+1 234 567 892', status: 'Expired', plan: 'Premium', expiry: 'Nov 10, 2024' },
    { id: '4', name: 'Sarah Wilson', phone: '+1 234 567 893', status: 'Active', plan: 'Premium', expiry: 'Jun 5, 2025' },
    { id: '5', name: 'Alex Chen', phone: '+1 234 567 894', status: 'Expired', plan: 'Basic', expiry: 'Oct 28, 2024' },
  ];

  const filtered = members.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || m.status === filter;
    return matchSearch && matchFilter;
  });

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('');
  
  const isActive = (status: string) => status === 'Active';

  return (
    <View style={styles.container}>
        <Text style={styles.headerCount}></Text>
        <Text style={styles.headerCount}></Text>
        <Text style={styles.headerCount}></Text>
      {/* Search */}
      <View style={styles.searchBox}>
        <SearchIcon />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name..."
          placeholderTextColor="#6b7280"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        {filters.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterActive]}
            onPress={() => setFilter(f)}>
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Members List */}
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {filtered.map(member => (
          <TouchableOpacity 
            key={member.id} 
            style={styles.card}
            onPress={() => setSelected(member)}
            activeOpacity={0.7}>
            <View style={styles.cardLeft}>
              <LinearGradient
                colors={isActive(member.status) ? ['#10b981', '#059669'] : ['#6b7280', '#4b5563']}
                style={styles.avatar}>
                <Text style={styles.avatarText}>{getInitials(member.name)}</Text>
              </LinearGradient>
              <View>
                <Text style={styles.name}>{member.name}</Text>
                <Text style={styles.meta}>{member.plan} • {member.expiry}</Text>
              </View>
            </View>
            <View style={[styles.statusDot, { backgroundColor: isActive(member.status) ? '#10b981' : '#ef4444' }]} />
          </TouchableOpacity>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Member Modal */}
      <Modal visible={!!selected} transparent animationType="slide" onRequestClose={() => setSelected(null)}>
        <View style={styles.modalBg}>
          <View style={styles.modal}>
            <View style={styles.modalTop}>
              <Text style={styles.modalTitle}>Member Details</Text>
              <TouchableOpacity onPress={() => setSelected(null)} style={styles.closeBtn}>
                <CloseIcon />
              </TouchableOpacity>
            </View>

            {selected && (
              <View style={styles.modalBody}>
                <LinearGradient
                  colors={isActive(selected.status) ? ['#10b981', '#059669'] : ['#6b7280', '#4b5563']}
                  style={styles.modalAvatar}>
                  <Text style={styles.modalAvatarText}>{getInitials(selected.name)}</Text>
                </LinearGradient>

                <Text style={styles.modalName}>{selected.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: isActive(selected.status) ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)' }]}>
                  <Text style={[styles.statusText, { color: isActive(selected.status) ? '#10b981' : '#ef4444' }]}>
                    {selected.status}
                  </Text>
                </View>

                <View style={styles.infoGrid}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Plan</Text>
                    <Text style={styles.infoValue}>{selected.plan}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Expiry</Text>
                    <Text style={styles.infoValue}>{selected.expiry}</Text>
                  </View>
                  <View style={[styles.infoItem, { borderBottomWidth: 0 }]}>
                    <Text style={styles.infoLabel}>Phone</Text>
                    <Text style={styles.infoValue}>{selected.phone}</Text>
                  </View>
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: 'rgba(16,185,129,0.15)' }]}>
                    <PhoneIcon />
                    <Text style={[styles.actionText, { color: '#10b981' }]}>Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: 'rgba(249,115,22,0.15)' }]}>
                    <BellIcon />
                    <Text style={[styles.actionText, { color: '#f97316' }]}>Remind</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <LinearGradient colors={['#f97316', '#ea580c']} style={styles.fabInner}>
          <PlusIcon />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  
  // Header
  header: { paddingTop: 56, paddingBottom: 20, paddingHorizontal: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerTitle: { fontSize: 26, fontWeight: '700', color: '#fff' },
  headerCount: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4 },

  // Search
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#151515', marginHorizontal: 16, marginTop: 16, borderRadius: 12, paddingHorizontal: 14, height: 48 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15, color: '#fff' },

  // Filters
  filters: { flexDirection: 'row', paddingHorizontal: 16, marginTop: 16, gap: 8 },
  filterBtn: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, backgroundColor: '#151515' },
  filterActive: { backgroundColor: '#f97316' },
  filterText: { fontSize: 14, fontWeight: '500', color: '#6b7280' },
  filterTextActive: { color: '#fff' },

  // List
  list: { flex: 1, paddingHorizontal: 16, marginTop: 16 },
  card: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#151515', padding: 14, borderRadius: 14, marginBottom: 10 },
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 15, fontWeight: '700', color: '#fff' },
  name: { fontSize: 15, fontWeight: '600', color: '#fff' },
  meta: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  statusDot: { width: 10, height: 10, borderRadius: 5 },

  // Modal
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  modal: { backgroundColor: '#151515', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingBottom: 36 },
  modalTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  modalTitle: { fontSize: 17, fontWeight: '600', color: '#fff' },
  closeBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  modalBody: { padding: 24, alignItems: 'center' },
  modalAvatar: { width: 72, height: 72, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  modalAvatarText: { fontSize: 24, fontWeight: '700', color: '#fff' },
  modalName: { fontSize: 22, fontWeight: '700', color: '#fff', marginTop: 16 },
  statusBadge: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, marginTop: 8 },
  statusText: { fontSize: 13, fontWeight: '600' },
  infoGrid: { width: '100%', marginTop: 24, backgroundColor: '#0a0a0a', borderRadius: 14, padding: 4 },
  infoItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  infoLabel: { fontSize: 14, color: '#6b7280' },
  infoValue: { fontSize: 14, fontWeight: '600', color: '#fff' },
  modalActions: { flexDirection: 'row', gap: 12, marginTop: 24, width: '100%' },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 12, gap: 8 },
  actionText: { fontSize: 15, fontWeight: '600' },

  // FAB
  fab: { position: 'absolute', bottom: 24, right: 20 },
  fabInner: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
});