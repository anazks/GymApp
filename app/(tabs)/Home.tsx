import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { Circle, Path, Svg } from 'react-native-svg';
import AddEnquiry from '../Components/Forms/AddEnquiry';
import AddMember from '../Components/Forms/AddMember';
import AddPayments from '../Components/Forms/AddPayments';
import AddTrainer from '../Components/Forms/AddTrainer';
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

// Icons as components
const UserPlusIcon = () => (
  <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
    <Circle cx="12" cy="7" r="4" />
    <Path strokeLinecap="round" strokeLinejoin="round" d="M19 8v6M22 11h-6" />
  </Svg>
);

const PaymentIcon = () => (
  <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12M6 12h12" />
    <Circle cx="12" cy="12" r="10" />
  </Svg>
);

const EnquiryIcon = () => (
  <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </Svg>
);

const TrainerIcon = () => (
  <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
  </Svg>
);

const SearchIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2}>
    <Circle cx="11" cy="11" r="8" />
    <Path strokeLinecap="round" d="M21 21l-4.35-4.35" />
  </Svg>
);

const FilterIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
  </Svg>
);

const BackIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </Svg>
);

const CloseIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </Svg>
);

const UpArrowIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v14" />
  </Svg>
);

// Sample member data
const membersData = [
  { id: '1', name: 'John Smith', batch: 'Morning', status: 'active', phone: '9876543210' },
  { id: '2', name: 'Sarah Wilson', batch: 'Evening', status: 'active', phone: '9876543211' },
  { id: '3', name: 'Mike Johnson', batch: 'Morning', status: 'expired', phone: '9876543212' },
  { id: '4', name: 'Emily Davis', batch: 'Afternoon', status: 'active', phone: '9876543213' },
  { id: '5', name: 'Chris Brown', batch: 'Evening', status: 'pending', phone: '9876543214' },
  { id: '6', name: 'Jessica Lee', batch: 'Morning', status: 'active', phone: '9876543215' },
  { id: '7', name: 'David Miller', batch: 'Afternoon', status: 'expired', phone: '9876543216' },
  { id: '8', name: 'Amanda White', batch: 'Evening', status: 'active', phone: '9876543217' },
];

const actionButtons = [
  { id: '1', title: 'Add Member', icon: UserPlusIcon, colors: ['#f97316', '#ea580c'] },
  { id: '2', title: 'Add Payment', icon: PaymentIcon, colors: ['#10b981', '#059669'] },
  { id: '3', title: 'Add Enquiry', icon: EnquiryIcon, colors: ['#6366f1', '#4f46e5'] },
  { id: '4', title: 'Add Trainer', icon: TrainerIcon, colors: ['#ec4899', '#db2777'] },
];

// Animated Member Card Component
const AnimatedMemberCard = ({ item, index, onPress, getStatusColor, getBatchColor }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay: index * 50,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: opacityAnim, transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity style={styles.memberCard} activeOpacity={0.7} onPress={() => onPress(item)}>
        <View style={styles.memberAvatar}>
          <Text style={styles.memberAvatarText}>{item.name.charAt(0)}</Text>
        </View>
        <View style={styles.memberInfo}>
          <Text style={styles.memberName}>{item.name}</Text>
          <View style={styles.memberMeta}>
            <View style={[styles.batchBadge, { backgroundColor: getBatchColor(item.batch) + '20' }]}>
              <Text style={[styles.batchText, { color: getBatchColor(item.batch) }]}>{item.batch}</Text>
            </View>
          </View>
        </View>
        <View style={styles.memberStatus}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Simple Swipe Indicator Component
const SwipeIndicator = ({ blinkAnim }) => {
  return (
    <Animated.View style={[styles.swipeIndicator, { opacity: blinkAnim }]}>
      <UpArrowIcon />
    </Animated.View>
  );
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedMember, setSelectedMember] = useState(null);
  const [showFullMembers, setShowFullMembers] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showAddEnquiry, setShowAddEnquiry] = useState(false);
  const [showAddTrainer, setShowAddTrainer] = useState(false);

  // Mock subscription data
  const subscriptionStatus = 'active';
  const subscriptionExpires = 'Dec 15, 2025';

  // Animation values
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const headerSlideAnim = useRef(new Animated.Value(-100)).current;
  
  // Member detail animations
  const detailSlideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const detailFadeAnim = useRef(new Animated.Value(0)).current;
  const avatarScaleAnim = useRef(new Animated.Value(0)).current;
  const contentSlideAnim = useRef(new Animated.Value(50)).current;

  // Add Member animations
  const addMemberSlideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const addMemberFadeAnim = useRef(new Animated.Value(0)).current;

  // Add Payment animations
  const addPaymentSlideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const addPaymentFadeAnim = useRef(new Animated.Value(0)).current;

  // Add Enquiry animations
  const addEnquirySlideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const addEnquiryFadeAnim = useRef(new Animated.Value(0)).current;

  // Add Trainer animations
  const addTrainerSlideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const addTrainerFadeAnim = useRef(new Animated.Value(0)).current;

  // Swipe gesture animations
  const gestureAnim = useRef(new Animated.Value(0)).current;
  
  // Blinking animation for swipe indicator
  const blinkAnim = useRef(new Animated.Value(1)).current;

  const filters = ['All', 'Active', 'Expired', 'Pending'];

  const filteredMembers = membersData.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || member.status.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'expired': return '#ef4444';
      case 'pending': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getBatchColor = (batch) => {
    switch (batch) {
      case 'Morning': return '#f97316';
      case 'Afternoon': return '#6366f1';
      case 'Evening': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  // Start blinking animation
  useEffect(() => {
    const blink = Animated.sequence([
      Animated.timing(blinkAnim, {
        toValue: 0.3,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(blinkAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(blink).start();
  }, []);

  const handleSwipe = (event) => {
    const { translationY, velocityY } = event.nativeEvent;
    
    if (event.nativeEvent.state === State.ACTIVE) {
      gestureAnim.setValue(translationY);
    }
    
    if (event.nativeEvent.state === State.END) {
      if (velocityY < -500 || translationY < -100) {
        // Successful swipe up
        Animated.parallel([
          Animated.spring(gestureAnim, {
            toValue: -150,
            tension: 200,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.timing(blinkAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          gestureAnim.setValue(0);
          openFullMembers();
        });
      } else {
        // Reset if swipe wasn't sufficient
        Animated.spring(gestureAnim, {
          toValue: 0,
          tension: 200,
          friction: 8,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const openFullMembers = () => {
    gestureAnim.setValue(0);
    setShowFullMembers(true);
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(headerSlideAnim, {
        toValue: 0,
        tension: 80,
        friction: 10,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeFullMembers = () => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: SCREEN_HEIGHT,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(headerSlideAnim, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowFullMembers(false);
      // Restart blinking animation when modal closes
      Animated.timing(blinkAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const openMemberDetail = (member) => {
    setSelectedMember(member);
    avatarScaleAnim.setValue(0);
    contentSlideAnim.setValue(50);
    
    Animated.parallel([
      Animated.spring(detailSlideAnim, {
        toValue: 0,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      }),
      Animated.timing(detailFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(avatarScaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.spring(contentSlideAnim, {
        toValue: 0,
        tension: 80,
        friction: 10,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeMemberDetail = () => {
    Animated.parallel([
      Animated.spring(detailSlideAnim, {
        toValue: SCREEN_HEIGHT,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      }),
      Animated.timing(detailFadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setSelectedMember(null));
  };

  const openAddMember = () => {
    setShowAddMember(true);
    addMemberSlideAnim.setValue(SCREEN_WIDTH);
    addMemberFadeAnim.setValue(0);
    Animated.parallel([
      Animated.spring(addMemberSlideAnim, {
        toValue: 0,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      }),
      Animated.timing(addMemberFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeAddMember = () => {
    Animated.parallel([
      Animated.spring(addMemberSlideAnim, {
        toValue: SCREEN_WIDTH,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      }),
      Animated.timing(addMemberFadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setShowAddMember(false));
  };

  const openAddPayment = () => {
    setShowAddPayment(true);
    addPaymentSlideAnim.setValue(SCREEN_WIDTH);
    addPaymentFadeAnim.setValue(0);
    Animated.parallel([
      Animated.spring(addPaymentSlideAnim, {
        toValue: 0,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      }),
      Animated.timing(addPaymentFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeAddPayment = () => {
    Animated.parallel([
      Animated.spring(addPaymentSlideAnim, {
        toValue: SCREEN_WIDTH,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      }),
      Animated.timing(addPaymentFadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setShowAddPayment(false));
  };

  const openAddEnquiry = () => {
    setShowAddEnquiry(true);
    addEnquirySlideAnim.setValue(SCREEN_WIDTH);
    addEnquiryFadeAnim.setValue(0);
    Animated.parallel([
      Animated.spring(addEnquirySlideAnim, {
        toValue: 0,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      }),
      Animated.timing(addEnquiryFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeAddEnquiry = () => {
    Animated.parallel([
      Animated.spring(addEnquirySlideAnim, {
        toValue: SCREEN_WIDTH,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      }),
      Animated.timing(addEnquiryFadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setShowAddEnquiry(false));
  };

  const openAddTrainer = () => {
    setShowAddTrainer(true);
    addTrainerSlideAnim.setValue(SCREEN_WIDTH);
    addTrainerFadeAnim.setValue(0);
    Animated.parallel([
      Animated.spring(addTrainerSlideAnim, {
        toValue: 0,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      }),
      Animated.timing(addTrainerFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeAddTrainer = () => {
    Animated.parallel([
      Animated.spring(addTrainerSlideAnim, {
        toValue: SCREEN_WIDTH,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      }),
      Animated.timing(addTrainerFadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setShowAddTrainer(false));
  };

  const renderActionButton = ({ item }) => {
    const IconComponent = item.icon;
    const isAddMember = item.id === '1';
    const isAddPayment = item.id === '2';
    const isAddEnquiry = item.id === '3';
    const isAddTrainer = item.id === '4';
    return (
      <TouchableOpacity 
        style={styles.actionButtonWrapper} 
        activeOpacity={0.8}
        onPress={
          isAddMember ? openAddMember : 
          isAddPayment ? openAddPayment : 
          isAddEnquiry ? openAddEnquiry : 
          isAddTrainer ? openAddTrainer : undefined
        }
      >
        <LinearGradient colors={item.colors} style={styles.actionButton} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <IconComponent />
          <Text style={styles.actionButtonText}>{item.title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderMemberItem = ({ item, index }) => (
    <AnimatedMemberCard
      item={item}
      index={index}
      onPress={openMemberDetail}
      getStatusColor={getStatusColor}
      getBatchColor={getBatchColor}
    />
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* Main Content - Scales down when modal opens */}
        <Animated.View style={[styles.mainContent, { transform: [{ scale: scaleAnim }] }]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerTitle}></Text>
              <View style={[
                styles.subscriptionStatus, 
                { backgroundColor: subscriptionStatus === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)' }
              ]}>
                <Text style={[
                  styles.statusText, 
                  { color: subscriptionStatus === 'active' ? '#10b981' : '#ef4444' }
                ]}>
                  {subscriptionStatus === 'active' ? 'Active' : 'Expired'}
                </Text>
                <Text style={styles.statusDetail}>Expires: {subscriptionExpires}</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionSection}>
            <FlatList
              data={actionButtons}
              renderItem={renderActionButton}
              keyExtractor={(item) => item.id}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.actionRow}
            />
          </View>

          {/* Members Section */}
          <View style={styles.membersSection}>
            <PanGestureHandler
              onGestureEvent={Animated.event(
                [{ nativeEvent: { translationY: gestureAnim } }],
                { useNativeDriver: true }
              )}
              onHandlerStateChange={handleSwipe}
            >
              <Animated.View style={styles.swipeArea}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Members</Text>
                  <View style={styles.viewAllContainer}>
                    <Text style={styles.memberCount}>{filteredMembers.length} total</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <Text style={styles.viewAllText}>View All</Text>
                      <SwipeIndicator blinkAnim={blinkAnim} />
                    </View>
                  </View>
                </View>

                {/* Search & Filter */}
                <View style={styles.searchContainer}>
                  <View style={styles.searchInputWrapper}>
                    <SearchIcon />
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Search members..."
                      placeholderTextColor="#6b7280"
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                    />
                  </View>
                  <TouchableOpacity style={styles.filterButton}>
                    <FilterIcon />
                  </TouchableOpacity>
                </View>

                {/* Filter Chips */}
                <View style={styles.filterChips}>
                  {filters.map((filter) => (
                    <TouchableOpacity
                      key={filter}
                      style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
                      onPress={() => setActiveFilter(filter)}
                    >
                      <Text style={[styles.filterChipText, activeFilter === filter && styles.filterChipTextActive]}>
                        {filter}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Members List */}
                <FlatList
                  data={filteredMembers.slice(0, 4)}
                  renderItem={renderMemberItem}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.membersList}
                />
              </Animated.View>
            </PanGestureHandler>
          </View>
        </Animated.View>

        {/* Full Members Modal Overlay */}
        {showFullMembers && (
          <>
            <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]} />
            <Animated.View style={[styles.fullMembersModal, { transform: [{ translateY: slideAnim }] }]}>
              <View style={styles.fullModalContainer}>
                <Animated.View style={[styles.modalHeader, { transform: [{ translateY: headerSlideAnim }] }]}>
                  <TouchableOpacity style={styles.backButton} onPress={closeFullMembers}>
                    <CloseIcon />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>All Members</Text>
                  <View style={{ width: 44 }} />
                </Animated.View>

                <View style={styles.fullMembersContent}>
                  <View style={styles.sectionHeaderFull}>
                    <Text style={styles.sectionTitleFull}>Members Directory</Text>
                    <Text style={styles.memberCountFull}>{filteredMembers.length} members</Text>
                  </View>

                  {/* Search & Filter */}
                  <View style={styles.searchContainer}>
                    <View style={styles.searchInputWrapper}>
                      <SearchIcon />
                      <TextInput
                        style={styles.searchInput}
                        placeholder="Search members..."
                        placeholderTextColor="#6b7280"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                      />
                    </View>
                    <TouchableOpacity style={styles.filterButton}>
                      <FilterIcon />
                    </TouchableOpacity>
                  </View>

                  {/* Filter Chips */}
                  <View style={styles.filterChips}>
                    {filters.map((filter) => (
                      <TouchableOpacity
                        key={filter}
                        style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
                        onPress={() => setActiveFilter(filter)}
                      >
                        <Text style={[styles.filterChipText, activeFilter === filter && styles.filterChipTextActive]}>
                          {filter}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Members List */}
                  <FlatList
                    data={filteredMembers}
                    renderItem={renderMemberItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.membersListFull}
                  />
                </View>
              </View>
            </Animated.View>
          </>
        )}

        {/* Member Detail Modal */}
        {selectedMember && (
          <>
            <Animated.View style={[styles.modalOverlay, { opacity: detailFadeAnim }]} />
            <Animated.View style={[styles.memberDetailModal, { transform: [{ translateY: detailSlideAnim }] }]}>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity style={styles.backButton} onPress={closeMemberDetail}>
                    <BackIcon />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Member Details</Text>
                  <View style={{ width: 44 }} />
                </View>

                <View style={styles.memberDetails}>
                  <Animated.View style={[styles.memberAvatarLarge, { transform: [{ scale: avatarScaleAnim }] }]}>
                    <Text style={styles.memberAvatarLargeText}>{selectedMember.name.charAt(0)}</Text>
                  </Animated.View>

                  <Animated.View style={{ transform: [{ translateY: contentSlideAnim }], opacity: detailFadeAnim }}>
                    <Text style={styles.memberDetailName}>{selectedMember.name}</Text>
                    <View style={styles.memberDetailMeta}>
                      <View style={[styles.batchBadgeLarge, { backgroundColor: getBatchColor(selectedMember.batch) + '20' }]}>
                        <Text style={[styles.batchTextLarge, { color: getBatchColor(selectedMember.batch) }]}>
                          {selectedMember.batch}
                        </Text>
                      </View>
                      <View style={styles.memberStatusLarge}>
                        <View style={[styles.statusDotLarge, { backgroundColor: getStatusColor(selectedMember.status) }]} />
                        <Text style={[styles.statusTextLarge, { color: getStatusColor(selectedMember.status) }]}>
                          {selectedMember.status.charAt(0).toUpperCase() + selectedMember.status.slice(1)}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.detailSection}>
                      <Text style={styles.detailLabel}>Phone Number</Text>
                      <Text style={styles.detailValue}>{selectedMember.phone}</Text>
                    </View>

                    <View style={styles.detailSection}>
                      <Text style={styles.detailLabel}>Member ID</Text>
                      <Text style={styles.detailValue}>#{selectedMember.id.padStart(4, '0')}</Text>
                    </View>
                  </Animated.View>
                </View>
              </View>
            </Animated.View>
          </>
        )}

        {/* Add Member Modal */}
        {showAddMember && (
          <>
            <Animated.View style={[styles.modalOverlay, { opacity: addMemberFadeAnim }]} />
            <Animated.View style={[styles.addMemberModal, { transform: [{ translateX: addMemberSlideAnim }] }]}>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity style={styles.backButton} onPress={closeAddMember}>
                    <BackIcon />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Add Member</Text>
                  <View style={{ width: 44 }} />
                </View>
                <View style={styles.addMemberContent}>
                  <AddMember onClose={closeAddMember} />
                </View>
              </View>
            </Animated.View>
          </>
        )}

        {/* Add Payment Modal */}
        {showAddPayment && (
          <>
            <Animated.View style={[styles.modalOverlay, { opacity: addPaymentFadeAnim }]} />
            <Animated.View style={[styles.addPaymentModal, { transform: [{ translateX: addPaymentSlideAnim }] }]}>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity style={styles.backButton} onPress={closeAddPayment}>
                    <BackIcon />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Add Payment</Text>
                  <View style={{ width: 44 }} />
                </View>
                <View style={styles.addPaymentContent}>
                  <AddPayments onClose={closeAddPayment} />
                </View>
              </View>
            </Animated.View>
          </>
        )}

        {/* Add Enquiry Modal */}
        {showAddEnquiry && (
          <>
            <Animated.View style={[styles.modalOverlay, { opacity: addEnquiryFadeAnim }]} />
            <Animated.View style={[styles.addEnquiryModal, { transform: [{ translateX: addEnquirySlideAnim }] }]}>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity style={styles.backButton} onPress={closeAddEnquiry}>
                    <BackIcon />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Add Enquiry</Text>
                  <View style={{ width: 44 }} />
                </View>
                <View style={styles.addEnquiryContent}>
                  <AddEnquiry onClose={closeAddEnquiry} />
                </View>
              </View>
            </Animated.View>
          </>
        )}

        {/* Add Trainer Modal */}
        {showAddTrainer && (
          <>
            <Animated.View style={[styles.modalOverlay, { opacity: addTrainerFadeAnim }]} />
            <Animated.View style={[styles.addTrainerModal, { transform: [{ translateX: addTrainerSlideAnim }] }]}>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity style={styles.backButton} onPress={closeAddTrainer}>
                    <BackIcon />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Add Trainer</Text>
                  <View style={{ width: 44 }} />
                </View>
                <View style={styles.addTrainerContent}>
                  <AddTrainer onClose={closeAddTrainer} />
                </View>
              </View>
            </Animated.View>
          </>
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  mainContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    color: '#6b7280',
    fontSize: 14,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 4,
  },
  subscriptionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 8,
    width: 'fit-content',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusDetail: {
    color: '#6b7280',
    fontSize: 11,
  },
  actionSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  actionRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  actionButtonWrapper: {
    width: '48%',
  },
  actionButton: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  membersSection: {
    flex: 1,
    backgroundColor: '#111',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  swipeArea: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  viewAllContainer: {
    alignItems: 'flex-end',
  },
  memberCount: {
    color: '#6b7280',
    fontSize: 12,
  },
  viewAllText: {
    color: '#f97316',
    fontSize: 14,
    fontWeight: '600',
  },
  // Simple Swipe Indicator
  swipeIndicator: {
    marginLeft: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    paddingHorizontal: 14,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
    paddingVertical: 14,
  },
  filterButton: {
    width: 50,
    backgroundColor: '#f97316',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChips: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
  },
  filterChipActive: {
    backgroundColor: '#f97316',
  },
  filterChipText: {
    color: '#6b7280',
    fontSize: 13,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  membersList: {
    paddingBottom: 20,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },
  memberAvatar: {
    width: 48,
    height: 48,
    backgroundColor: '#f97316',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberAvatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  memberInfo: {
    flex: 1,
    marginLeft: 14,
  },
  memberName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  memberMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  batchBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  batchText: {
    fontSize: 11,
    fontWeight: '600',
  },
  memberStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  fullMembersModal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  memberDetailModal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  addMemberModal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  addPaymentModal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  addEnquiryModal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  addTrainerModal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  fullModalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  fullMembersContent: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeaderFull: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleFull: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  memberCountFull: {
    color: '#6b7280',
    fontSize: 14,
  },
  membersListFull: {
    paddingBottom: 40,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  addMemberContent: {
    flex: 1,
  },
  addPaymentContent: {
    flex: 1,
  },
  addEnquiryContent: {
    flex: 1,
  },
  addTrainerContent: {
    flex: 1,
  },
  memberDetails: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    paddingTop: 40,
  },
  memberAvatarLarge: {
    width: 100,
    height: 100,
    backgroundColor: '#f97316',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  memberAvatarLargeText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '700',
  },
  memberDetailName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  memberDetailMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
  },
  batchBadgeLarge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  batchTextLarge: {
    fontSize: 14,
    fontWeight: '600',
  },
  memberStatusLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
  },
  statusDotLarge: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusTextLarge: {
    fontSize: 14,
    fontWeight: '600',
  },
  detailSection: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
  },
  detailLabel: {
    color: '#6b7280',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});