import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';

// Icons
const ChevronIcon = ({ color = '#4b5563' }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </Svg>
);

const UserIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
  </Svg>
);

const WalletIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
  </Svg>
);

const BellIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </Svg>
);

const CogIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <Circle cx="12" cy="12" r="3" />
  </Svg>
);

const HelpIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </Svg>
);

const InfoIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  </Svg>
);

const LogoutIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
  </Svg>
);

const EditIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
  </Svg>
);

const CrownIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="#fbbf24" stroke="none">
    <Path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </Svg>
);

type SettingOption = {
  id: string;
  label: string;
  isPremium?: boolean;
};

type MenuItem = {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.FC;
  iconBg: string;
  options?: SettingOption[];
};

const menuItems: MenuItem[] = [
  { 
    id: '1', 
    title: 'Account', 
    subtitle: 'Profile, Security, Privacy', 
    icon: UserIcon, 
    iconBg: 'rgba(249, 115, 22, 0.15)',
    options: [
      { id: '1-1', label: 'Edit Profile' },
      { id: '1-2', label: 'Change Password' },
      { id: '1-3', label: 'Two-Factor Authentication', isPremium: true },
      { id: '1-4', label: 'Privacy Settings' },
    ]
  },
  { 
    id: '2', 
    title: 'Payments', 
    subtitle: 'Methods, History, Billing', 
    icon: WalletIcon, 
    iconBg: 'rgba(16, 185, 129, 0.15)',
    options: [
      { id: '2-1', label: 'Payment Methods' },
      { id: '2-2', label: 'Transaction History' },
      { id: '2-3', label: 'Auto-Pay', isPremium: true },
      { id: '2-4', label: 'Billing Address' },
    ]
  },
  { 
    id: '3', 
    title: 'Notifications', 
    subtitle: 'Push, Email, SMS alerts', 
    icon: BellIcon, 
    iconBg: 'rgba(99, 102, 241, 0.15)',
    options: [
      { id: '3-1', label: 'Push Notifications' },
      { id: '3-2', label: 'Email Alerts' },
      { id: '3-3', label: 'SMS Notifications', isPremium: true },
      { id: '3-4', label: 'In-App Alerts' },
    ]
  },
  { 
    id: '4', 
    title: 'Settings', 
    subtitle: 'General, Display, Language', 
    icon: CogIcon, 
    iconBg: 'rgba(139, 92, 246, 0.15)',
    options: [
      { id: '4-1', label: 'General Settings' },
      { id: '4-2', label: 'Display & Theme' },
      { id: '4-3', label: 'Language' },
      { id: '4-4', label: 'Advanced Settings', isPremium: true },
    ]
  },
  { 
    id: '5', 
    title: 'Help & Support', 
    subtitle: 'FAQ, Contact, Report', 
    icon: HelpIcon, 
    iconBg: 'rgba(236, 72, 153, 0.15)',
    options: [
      { id: '5-1', label: 'FAQ' },
      { id: '5-2', label: 'Contact Support' },
      { id: '5-3', label: 'Priority Support', isPremium: true },
      { id: '5-4', label: 'Report Issue' },
    ]
  },
  { 
    id: '6', 
    title: 'About', 
    subtitle: 'Version, Terms, Privacy', 
    icon: InfoIcon, 
    iconBg: 'rgba(20, 184, 166, 0.15)',
    options: [
      { id: '6-1', label: 'App Version' },
      { id: '6-2', label: 'Terms of Service' },
      { id: '6-3', label: 'Privacy Policy' },
      { id: '6-4', label: 'Licenses' },
    ]
  },
];

export default function Menu() {
  const [expandedItem, setExpandedItem] = React.useState<string | null>(null);

  const handlePress = (item: MenuItem) => {
    setExpandedItem(expandedItem === item.id ? null : item.id);
  };

  const handleOptionPress = (option: SettingOption) => {
    if (option.isPremium) {
      console.log('Premium feature:', option.label);
      // Show upgrade prompt
    } else {
      console.log('Selected option:', option.label);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.avatarText}></Text>
      <Text style={styles.avatarText}></Text>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <LinearGradient colors={['#f97316', '#ea580c']} style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </LinearGradient>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@email.com</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <EditIcon />
          </TouchableOpacity>
        </View>

        {/* Menu Section */}
        <Text style={styles.sectionTitle}>General</Text>
        <View style={styles.menuCard}>
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isLast = index === menuItems.length - 1;
            const isExpanded = expandedItem === item.id;
            return (
              <View key={item.id}>
                <TouchableOpacity
                  style={[styles.menuItem, !isLast && !isExpanded && styles.menuItemBorder]}
                  onPress={() => handlePress(item)}
                  activeOpacity={0.6}>
                  <View style={[styles.iconBox, { backgroundColor: item.iconBg }]}>
                    <IconComponent />
                  </View>
                  <View style={styles.menuContent}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    {item.subtitle && <Text style={styles.menuSubtitle}>{item.subtitle}</Text>}
                  </View>
                  <Svg 
                    width={18} 
                    height={18} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#4b5563" 
                    strokeWidth={2}
                    style={{ transform: [{ rotate: isExpanded ? '90deg' : '0deg' }] }}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </Svg>
                </TouchableOpacity>
                
                {/* Expanded Options */}
                {isExpanded && item.options && (
                  <View style={styles.optionsContainer}>
                    {item.options.map((option, optIndex) => (
                      <TouchableOpacity
                        key={option.id}
                        style={[
                          styles.optionItem,
                          optIndex === item.options!.length - 1 && styles.optionItemLast
                        ]}
                        onPress={() => handleOptionPress(option)}
                        activeOpacity={0.6}>
                        <Text style={styles.optionLabel}>{option.label}</Text>
                        {option.isPremium && (
                          <View style={styles.premiumBadge}>
                            <CrownIcon />
                            <Text style={styles.premiumText}>Pro</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                
                {!isLast && isExpanded && <View style={styles.menuItemBorder} />}
              </View>
            );
          })}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.7}
            onPress={()=>router.push('/')}
        > 
          <LogoutIcon />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Footer */}
        {/* <Text style={styles.version}>ForgeFit v1.0.0</Text> */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },

  // Header
  header: { paddingTop: 56, paddingBottom: 20, paddingHorizontal: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerTitle: { fontSize: 26, fontWeight: '700', color: '#fff' },

  scroll: { flex: 1, paddingHorizontal: 16 },

  // Profile Card
  profileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#151515', borderRadius: 16, padding: 16, marginTop: 20 },
  avatar: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 20, fontWeight: '700', color: '#fff' },
  profileInfo: { flex: 1, marginLeft: 14 },
  profileName: { fontSize: 18, fontWeight: '700', color: '#fff' },
  profileEmail: { fontSize: 13, color: '#6b7280', marginTop: 2 },
  editBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },

  // Section
  sectionTitle: { fontSize: 13, fontWeight: '600', color: '#6b7280', marginTop: 24, marginBottom: 12, marginLeft: 4, textTransform: 'uppercase', letterSpacing: 0.5 },

  // Menu Card
  menuCard: { backgroundColor: '#151515', borderRadius: 16, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  iconBox: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  menuContent: { flex: 1, marginLeft: 14 },
  menuTitle: { fontSize: 15, fontWeight: '600', color: '#fff' },
  menuSubtitle: { fontSize: 12, color: '#6b7280', marginTop: 2 },

  // Logout
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: 14, padding: 14, marginTop: 24, gap: 10 },
  logoutText: { fontSize: 15, fontWeight: '600', color: '#ef4444' },

  // Footer
  version: { fontSize: 12, color: '#4b5563', textAlign: 'center', marginTop: 24 },

  // Options
  optionsContainer: { backgroundColor: '#0f0f0f', paddingHorizontal: 16, paddingVertical: 8 },
  optionItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 6,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  optionItemLast: { marginBottom: 0 },
  optionLabel: { fontSize: 14, color: '#d1d5db', fontWeight: '500' },
  premiumBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  premiumText: { fontSize: 11, fontWeight: '600', color: '#fbbf24' },
});