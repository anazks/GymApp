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
interface AddTrainerProps {
  onClose: () => void;
}

export default function AddTrainer({ onClose }: AddTrainerProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialization, setSpecialization] = useState('Fitness');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');

  const specializations = ['Fitness', 'Yoga', 'Cardio', 'Strength', 'Other'];

  const handleSubmit = () => {
    if (!fullName || !phone || !email || !specialization || !experience || !bio) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // Handle form submission logic here
    Alert.alert('Success', 'Trainer added successfully!');
    onClose();
  };

  const BackIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </Svg>
);


  return (
    <SafeAreaView style={styles.container} >

      <View style={styles.modalHeader}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Add Trainer</Text>
        <View style={{ width: 44 }} />
      </View>
      <ScrollView style={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
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
          <Text style={styles.label}>Specialization</Text>
          <View style={styles.specializationContainer}>
            {specializations.map((spec) => (
              <TouchableOpacity
                key={spec}
                style={[
                  styles.specializationButton,
                  specialization === spec && styles.specializationButtonActive
                ]}
                onPress={() => setSpecialization(spec)}
              >
                <Text style={[
                  styles.specializationText,
                  specialization === spec && styles.specializationTextActive
                ]}>
                  {spec}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Years of Experience</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter years of experience"
            placeholderTextColor="#6b7280"
            value={experience}
            onChangeText={setExperience}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe trainer's bio..."
            placeholderTextColor="#6b7280"
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <LinearGradient
            colors={['#ec4899', '#db2777']}
            style={styles.gradientButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.submitButtonText}>Add Trainer</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    // padding: 20,
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  formSection: {
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  specializationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specializationButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  specializationButtonActive: {
    backgroundColor: '#ec4899',
    borderColor: '#ec4899',
  },
  specializationText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '500',
  },
  specializationTextActive: {
    color: '#fff',
  },
  submitButton: {
    marginTop: 20,
  },
  gradientButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});