import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

// Minimal Icons
const PhoneIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </Svg>
);

const BellIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </Svg>
);

const CheckIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2.5}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </Svg>
);

export default function Payments() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Pending', 'Paid', 'Overdue'];

  const stats = { collected: 2450, pending: 1200, total: 4000 };
  const progress = Math.round((stats.collected / stats.total) * 100);

  const members = [
    { id: '1', name: 'John Doe', status: 'Pending', amount: 150, due: 'Due in 3 days' },
    { id: '2', name: 'Jane Smith', status: 'Paid', amount: 150, due: 'Paid Nov 15' },
    { id: '3', name: 'Mike Johnson', status: 'Overdue', amount: 150, due: '5 days overdue' },
    { id: '4', name: 'Sarah Wilson', status: 'Pending', amount: 150, due: 'Due in 7 days' },
    { id: '5', name: 'Alex Chen', status: 'Paid', amount: 150, due: 'Paid Nov 12' },
  ];

  const filtered = filter === 'All' ? members : members.filter(m => m.status === filter);

  const getColor = (status: string) => {
    if (status === 'Paid') return '#10b981';
    if (status === 'Overdue') return '#ef4444';
    return '#f97316';
  };

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('');

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <LinearGradient colors={['#f97316', '#ea580c']} style={styles.header}>
        <Text style={styles.headerTitle}>Payments</Text>
        <Text style={styles.headerSub}>November 2024</Text>
      </LinearGradient> */}
        <Text style={styles.headerTitle}></Text>
        <Text style={styles.headerTitle}></Text>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summaryLabel}>Collected</Text>
              <Text style={styles.summaryValue}>${stats.collected.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRight}>
              <Text style={styles.progressText}>{progress}%</Text>
            </View>
          </View>
          <View style={styles.progressBg}>
            <LinearGradient
              colors={['#f97316', '#ea580c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: `${progress}%` }]}
            />
          </View>
          <Text style={styles.summaryMeta}>${stats.pending.toLocaleString()} pending • ${stats.total.toLocaleString()} total</Text>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterRow}>
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
        <Text style={styles.listTitle}>{filtered.length} Members</Text>
        
        {filtered.map(member => {
          const color = getColor(member.status);
          const isPaid = member.status === 'Paid';
          return (
            <View key={member.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.cardLeft}>
                  <LinearGradient
                    colors={isPaid ? ['#10b981', '#059669'] : member.status === 'Overdue' ? ['#ef4444', '#dc2626'] : ['#f97316', '#ea580c']}
                    style={styles.avatar}>
                    <Text style={styles.avatarText}>{getInitials(member.name)}</Text>
                  </LinearGradient>
                  <View>
                    <Text style={styles.name}>{member.name}</Text>
                    <Text style={[styles.due, { color }]}>{member.due}</Text>
                  </View>
                </View>
                <Text style={styles.amount}>${member.amount}</Text>
              </View>

              <View style={styles.cardBottom}>
                <View style={[styles.badge, { backgroundColor: `${color}20` }]}>
                  {isPaid && <CheckIcon />}
                  <Text style={[styles.badgeText, { color }]}>{member.status}</Text>
                </View>
                <View style={styles.actions}>
                  {!isPaid && (
                    <TouchableOpacity style={styles.payBtn}>
                      <Text style={styles.payText}>Record</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity style={styles.iconBtn}><PhoneIcon /></TouchableOpacity>
                  <TouchableOpacity style={styles.iconBtn}><BellIcon /></TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <LinearGradient colors={['#f97316', '#ea580c']} style={styles.fabInner}>
          <Text style={styles.fabText}>+ Add Payment</Text>
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
  headerSub: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4 },

  scroll: { flex: 1, paddingHorizontal: 16 },

  // Summary
  summaryCard: { backgroundColor: '#151515', borderRadius: 16, padding: 18, marginTop: 20 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  summaryLabel: { fontSize: 13, color: '#6b7280' },
  summaryValue: { fontSize: 28, fontWeight: '700', color: '#fff', marginTop: 4 },
  summaryRight: { alignItems: 'flex-end' },
  progressText: { fontSize: 20, fontWeight: '700', color: '#f97316' },
  progressBg: { height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, marginTop: 16, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  summaryMeta: { fontSize: 12, color: '#6b7280', marginTop: 12 },

  // Filters
  filterRow: { flexDirection: 'row', marginTop: 20, backgroundColor: '#151515', borderRadius: 12, padding: 4 },
  filterBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  filterActive: { backgroundColor: '#f97316' },
  filterText: { fontSize: 13, fontWeight: '600', color: '#6b7280' },
  filterTextActive: { color: '#fff' },

  // List
  listTitle: { fontSize: 15, fontWeight: '600', color: '#6b7280', marginTop: 20, marginBottom: 12 },

  // Card
  card: { backgroundColor: '#151515', borderRadius: 14, padding: 14, marginBottom: 10 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  name: { fontSize: 15, fontWeight: '600', color: '#fff' },
  due: { fontSize: 12, marginTop: 2 },
  amount: { fontSize: 20, fontWeight: '700', color: '#fff' },

  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 16, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  actions: { flexDirection: 'row', gap: 8 },
  payBtn: { backgroundColor: '#f97316', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  payText: { fontSize: 13, fontWeight: '600', color: '#fff' },
  iconBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },

  // FAB
  fab: { position: 'absolute', bottom: 24, left: 20, right: 20 },
  fabInner: { paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  fabText: { fontSize: 15, fontWeight: '700', color: '#fff' },
});