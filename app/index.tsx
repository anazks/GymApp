import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Path, Svg } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function GetStarted() {
  // Animation values
  const fadeTop = useRef(new Animated.Value(0)).current;
  const translateTop = useRef(new Animated.Value(-20)).current;
  const fadeCenter = useRef(new Animated.Value(0)).current;
  const scaleCenter = useRef(new Animated.Value(0.95)).current;
  const fadeBottom = useRef(new Animated.Value(0)).current;
  const translateBottom = useRef(new Animated.Value(20)).current;
  const ring1Scale = useRef(new Animated.Value(1)).current;
  const ring1Opacity = useRef(new Animated.Value(1)).current;
  const ring2Scale = useRef(new Animated.Value(1)).current;
  const ring2Opacity = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const statFade1 = useRef(new Animated.Value(0)).current;
  const statFade2 = useRef(new Animated.Value(0)).current;
  const statFade3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeTop, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(translateTop, { toValue: 0, duration: 1000, useNativeDriver: true }),
    ]).start();

    Animated.parallel([
      Animated.timing(fadeCenter, { toValue: 1, duration: 1000, delay: 300, useNativeDriver: true }),
      Animated.timing(scaleCenter, { toValue: 1, duration: 1000, delay: 300, useNativeDriver: true }),
    ]).start();

    Animated.parallel([
      Animated.timing(fadeBottom, { toValue: 1, duration: 1000, delay: 500, useNativeDriver: true }),
      Animated.timing(translateBottom, { toValue: 0, duration: 1000, delay: 500, useNativeDriver: true }),
    ]).start();

    // Stats staggered fade
    Animated.timing(statFade1, { toValue: 1, duration: 600, delay: 600, useNativeDriver: true }).start();
    Animated.timing(statFade2, { toValue: 1, duration: 600, delay: 700, useNativeDriver: true }).start();
    Animated.timing(statFade3, { toValue: 1, duration: 600, delay: 800, useNativeDriver: true }).start();

    // Ring pulse animation
    const ringAnimation = () => {
      Animated.parallel([
        Animated.timing(ring1Scale, { toValue: 1.5, duration: 2000, useNativeDriver: true }),
        Animated.timing(ring1Opacity, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ]).start(() => {
        ring1Scale.setValue(1);
        ring1Opacity.setValue(1);
        ringAnimation();
      });
    };

    const ring2Animation = () => {
      Animated.parallel([
        Animated.timing(ring2Scale, { toValue: 1.7, duration: 2500, useNativeDriver: true }),
        Animated.timing(ring2Opacity, { toValue: 0, duration: 2500, useNativeDriver: true }),
      ]).start(() => {
        ring2Scale.setValue(1);
        ring2Opacity.setValue(1);
        ring2Animation();
      });
    };

    ringAnimation();
    setTimeout(ring2Animation, 500);

    // Dot pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.3, duration: 750, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 750, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background gradient blobs */}
      <LinearGradient
        colors={['rgba(234, 88, 12, 0.3)', 'transparent']}
        style={styles.blob1}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 1, y: 1 }}
      />
      <LinearGradient
        colors={['rgba(220, 38, 38, 0.3)', 'transparent']}
        style={styles.blob2}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 0, y: 0 }}
      />

      {/* Top Section */}
      <Animated.View
        style={[
          styles.topSection,
          { opacity: fadeTop, transform: [{ translateY: translateTop }] },
        ]}
      >
        <View style={styles.statusIndicator}>
          <Animated.View style={[styles.statusDot, { transform: [{ scale: pulseAnim }] }]} />
          <Text style={styles.statusText}>READY TO TRANSFORM</Text>
        </View>
      </Animated.View>

      {/* Center Content */}
      <Animated.View
        style={[
          styles.centerContent,
          { opacity: fadeCenter, transform: [{ scale: scaleCenter }] },
        ]}
      >
        {/* Logo with rings */}
        <View style={styles.logoContainer}>
          <Animated.View
            style={[
              styles.ring,
              styles.ring1,
              { opacity: ring1Opacity, transform: [{ scale: ring1Scale }] },
            ]}
          />
          <Animated.View
            style={[
              styles.ring,
              styles.ring2,
              { opacity: ring2Opacity, transform: [{ scale: ring2Scale }] },
            ]}
          />
          <LinearGradient
            colors={['#f97316', '#dc2626']}
            style={styles.logoIcon}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Svg width={60} height={60} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}>
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </Svg>
          </LinearGradient>
        </View>

        <Text style={styles.appTitle}>
          PRO<Text style={styles.appTitleAccent}>FIT</Text>
        </Text>
        <Text style={styles.appTagline}>Your ultimate gym companion for crushing goals</Text>

        {/* Stats */}
        <View style={styles.stats}>
          <Animated.View style={[styles.stat, { opacity: statFade1 }]}>
            <Text style={styles.statValue}>500+</Text>
            <Text style={styles.statLabel}>WORKOUTS</Text>
          </Animated.View>
          <Animated.View style={[styles.stat, { opacity: statFade2 }]}>
            <Text style={styles.statValue}>50K</Text>
            <Text style={styles.statLabel}>MEMBERS</Text>
          </Animated.View>
          <Animated.View style={[styles.stat, { opacity: statFade3 }]}>
            <Text style={styles.statValue}>98%</Text>
            <Text style={styles.statLabel}>SUCCESS</Text>
          </Animated.View>
        </View>
      </Animated.View>

      {/* Bottom Section */}
      <Animated.View
        style={[
          styles.bottomSection,
          { opacity: fadeBottom, transform: [{ translateY: translateBottom }] },
        ]}
      >
        <TouchableOpacity activeOpacity={0.9}
            onPress={router.push.bind(this, '/(tabs)/Home')}
        >
          <LinearGradient
            colors={['#f97316', '#dc2626']}
            style={styles.btnPrimary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.btnPrimaryText}>Get Started</Text>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </Svg>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} activeOpacity={0.8}
            onPress={router.push.bind(this, '/Screen/Login/Login')}
        >
          <Text style={styles.btnSecondaryText}>I already have an account</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          By continuing, you agree to our{' '}
          <Text style={styles.termsLink}>Terms</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </Animated.View>

      {/* Bottom indicator */}
      <View style={styles.bottomIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  blob1: {
    position: 'absolute',
    top: -height * 0.3,
    left: -width * 0.5,
    width: width,
    height: height * 0.8,
    borderRadius: 999,
  },
  blob2: {
    position: 'absolute',
    bottom: -height * 0.3,
    right: -width * 0.5,
    width: width,
    height: height * 0.8,
    borderRadius: 999,
  },
  topSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    backgroundColor: '#f97316',
    borderRadius: 5,
  },
  statusText: {
    color: '#f97316',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 3,
  },
  centerContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  ring: {
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 999,
  },
  ring1: {
    width: 140,
    height: 140,
    borderColor: 'rgba(249, 115, 22, 0.4)',
  },
  ring2: {
    width: 160,
    height: 160,
    borderColor: 'rgba(249, 115, 22, 0.2)',
  },
  logoIcon: {
    width: 110,
    height: 110,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '12deg' }],
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 20,
  },
  appTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -2,
    marginBottom: 12,
  },
  appTitleAccent: {
    color: '#f97316',
  },
  appTagline: {
    color: '#9ca3af',
    fontSize: 17,
    textAlign: 'center',
    maxWidth: 260,
    lineHeight: 26,
  },
  stats: {
    flexDirection: 'row',
    gap: 40,
    marginTop: 32,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  statLabel: {
    fontSize: 10,
    color: '#6b7280',
    letterSpacing: 2,
    marginTop: 4,
  },
  bottomSection: {
    width: '100%',
    maxWidth: 380,
    marginBottom: 16,
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 12,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  btnSecondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  btnSecondaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  terms: {
    textAlign: 'center',
    color: '#4b5563',
    fontSize: 12,
    marginTop: 20,
  },
  termsLink: {
    color: '#9ca3af',
    textDecorationLine: 'underline',
  },
  bottomIndicator: {
    position: 'absolute',
    bottom: 8,
    width: 120,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
  },
});