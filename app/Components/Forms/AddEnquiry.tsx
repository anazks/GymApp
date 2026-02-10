import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Path, Svg } from 'react-native-svg';
import {useRouter} from 'expo-router';
interface AddEnquiryProps {
  onClose: () => void;
}

export default function AddEnquiry({ onClose }: AddEnquiryProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [enquiryType, setEnquiryType] = useState('Membership');
  const [message, setMessage] = useState('');

  const enquiryTypes = ['Membership', 'Training', 'Facilities', 'Other'];

  const handleSubmit = () => {
    if (!fullName || !phone || !email || !message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // Handle form submission logic here
    Alert.alert('Success', 'Enquiry submitted successfully!');
    onClose();
  };

  const BackIcon = () => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
      <Path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </Svg>
  );
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modalHeader}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Add Enquiry</Text>
        <View style={{ width: 44 }} />
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Submit Enquiry</Text>
          <Text style={styles.headerSubtitle}>We'll get back to you within 24 hours</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.formSection}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter full name"
              placeholderTextColor="#6b7280"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              placeholderTextColor="#6b7280"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              placeholderTextColor="#6b7280"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Enquiry Type</Text>
            <View style={styles.enquiryTypeContainer}>
              {enquiryTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.enquiryTypeButton,
                    enquiryType === type && styles.enquiryTypeButtonActive
                  ]}
                  onPress={() => setEnquiryType(type)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.enquiryTypeText,
                    enquiryType === type && styles.enquiryTypeTextActive
                  ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your enquiry..."
              placeholderTextColor="#6b7280"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
            />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#6366f1', '#4f46e5']}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.submitButtonText}>Submit Enquiry</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
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
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    color: '#9ca3af',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
  },
  form: {
    gap: 24,
  },
  formSection: {
    gap: 10,
  },
  label: {
    color: '#e5e7eb',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 16,
  },
  enquiryTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  enquiryTypeButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  enquiryTypeButtonActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  enquiryTypeText: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '600',
  },
  enquiryTypeTextActive: {
    color: '#fff',
  },
  submitButton: {
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  gradientButton: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});