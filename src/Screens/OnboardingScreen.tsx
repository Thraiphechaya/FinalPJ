import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Image,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { Storage } from '../storage';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type OnboardingScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Onboarding'
>;

interface Props {
    navigation: OnboardingScreenNavigationProp;
}

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
    // ตรวจสอบว่าเคยดู onboarding หรือยัง
    useEffect(() => {
        checkOnboardingStatus();
    }, []);

    const checkOnboardingStatus = async () => {
        try {
            const hasSeenOnboarding = await Storage.hasSeenOnboarding();
            if (hasSeenOnboarding) {
                // ถ้าเคยดูแล้ว ให้ตรวจสอบว่า login แล้วหรือยัง
                const isLoggedIn = await Storage.isLoggedIn();
                if (isLoggedIn) {
                    console.log('✅ User is logged in, going to Home');
                    navigation.replace('Home');
                } else {
                    console.log('✅ User has seen onboarding, going to Login');
                    navigation.replace('Login');
                }
            }
        } catch (error) {
            console.error('❌ Error checking onboarding status:', error);
        }
    };

    const handleGetStarted = async (): Promise<void> => {
        try {
            // บันทึกว่าเคยดู onboarding แล้ว
            await Storage.setOnboardingSeen();
            console.log('✅ Onboarding status saved');
            navigation.replace('Login');
        } catch (error) {
            console.error('❌ Error saving onboarding status:', error);
            navigation.replace('Login');
        }
    };

    const handleLogin = (): void => {
        navigation.replace('Login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />
            
            {/* Logo Background */}
            <View style={styles.backgroundContainer}>
                <View style={styles.logoBackground}>
                    <Image
                        source={require('../Picture/LogoPJ2.png')}
                        style={styles.backgroundLogo}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.overlay} />
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logoCircle}>
                            <Image
                                source={require('../Picture/LogoPJ.png')}
                                style={styles.logoImage}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                    <Text style={styles.title}>Veggie Peek</Text>
                    <Text style={styles.subtitle}>แอปพลิเคชันจัดการผักและผลไม้ครบวงจร</Text>
                </View>

                {/* Main Features */}
                <View style={styles.featuresSection}>
                    <Text style={styles.sectionTitle}>คุณสมบัติหลัก</Text>
                    
                    <View style={styles.featuresGrid}>
                        <View style={styles.featureRow}>
                            <View style={styles.featureCard}>
                                <View style={[styles.featureIcon, styles.homeIcon]}>
                                    <Text style={styles.featureEmoji}>🏠</Text>
                                </View>
                                <Text style={styles.featureTitle}>หน้าหลัก</Text>
                                <Text style={styles.featureDescription}>
                                    ดูผักและผลไม้ทั้งหมดในแอพ
                                </Text>
                            </View>

                            <View style={styles.featureCard}>
                                <View style={[styles.featureIcon, styles.cameraIcon]}>
                                    <Text style={styles.featureEmoji}>📸</Text>
                                </View>
                                <Text style={styles.featureTitle}>ถ่ายรูปวิเคราะห์</Text>
                                <Text style={styles.featureDescription}>
                                    วิเคราะห์ประเภทผักผลไม้จากภาพ
                                </Text>
                            </View>
                        </View>

                        <View style={styles.featureRow}>
                            <View style={styles.featureCard}>
                                <View style={[styles.featureIcon, styles.heartIcon]}>
                                    <Text style={styles.featureEmoji}>❤️</Text>
                                </View>
                                <Text style={styles.featureTitle}>รายการโปรด</Text>
                                <Text style={styles.featureDescription}>
                                    บันทึกสิ่งที่คุณชอบ
                                </Text>
                            </View>

                            <View style={styles.featureCard}>
                                <View style={[styles.featureIcon, styles.searchIcon]}>
                                    <Text style={styles.featureEmoji}>🔍</Text>
                                </View>
                                <Text style={styles.featureTitle}>ค้นหา</Text>
                                <Text style={styles.featureDescription}>
                                    ค้นหาอย่างรวดเร็ว
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* How to Use */}
                <View style={styles.usageSection}>
                    <Text style={styles.sectionTitle}>วิธีใช้งาน</Text>
                    <View style={styles.usageSteps}>
                        <View style={styles.stepContainer}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>1</Text>
                            </View>
                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitle}>ดูเนื้อหาทั้งหมด</Text>
                                <Text style={styles.stepDescription}>
                                    ไปที่หน้าหลักเพื่อดูผักผลไม้ทั้งหมด
                                </Text>
                            </View>
                        </View>

                        <View style={styles.stepContainer}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>2</Text>
                            </View>
                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitle}>ถ่ายรูปวิเคราะห์</Text>
                                <Text style={styles.stepDescription}>
                                    ใช้กล้องถ่ายภาพผักผลไม้เพื่อวิเคราะห์
                                </Text>
                            </View>
                        </View>

                        <View style={styles.stepContainer}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>3</Text>
                            </View>
                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitle}>บันทึกรายการโปรด</Text>
                                <Text style={styles.stepDescription}>
                                    กดหัวใจเพื่อบันทึกสิ่งที่คุณชอบ
                                </Text>
                            </View>
                        </View>

                        <View style={styles.stepContainer}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>4</Text>
                            </View>
                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitle}>ค้นหา</Text>
                                <Text style={styles.stepDescription}>
                                    ค้นหาสิ่งที่ต้องการได้อย่างง่ายดาย
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={handleGetStarted}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.primaryButtonText}>เริ่มต้นใช้งาน</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={handleLogin}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.secondaryButtonText}>เข้าสู่ระบบ</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#61edccf7',
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
    },
    logoBackground: {
        flex: 1,
        backgroundColor: '#9cf2a3b8',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.1,
    },
    backgroundLogo: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_WIDTH * 0.8,
        opacity: 0.3,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    scrollView: {
        flex: 1,
        zIndex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    header: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
        marginBottom: 20,
    },
    logoContainer: {
        marginBottom: 16,
    },
    logoCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    logoImage: {
        width: 60,
        height: 60,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#E8F5E8',
        textAlign: 'center',
        lineHeight: 22,
    },
    featuresSection: {
        paddingHorizontal: 24,
        paddingTop: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 20,
        textAlign: 'center',
    },
    featuresGrid: {
        marginBottom: 10,
    },
    featureRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    featureCard: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 16,
        width: (SCREEN_WIDTH - 56) / 2,
        alignItems: 'center',
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#E8F5E9',
    },
    featureIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    homeIcon: {
        backgroundColor: '#E8F5E9',
    },
    cameraIcon: {
        backgroundColor: '#E3F2FD',
    },
    heartIcon: {
        backgroundColor: '#FFEBEE',
    },
    searchIcon: {
        backgroundColor: '#FFF3E0',
    },
    featureEmoji: {
        fontSize: 24,
    },
    featureTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 4,
        textAlign: 'center',
    },
    featureDescription: {
        fontSize: 12,
        color: '#666666',
        textAlign: 'center',
        lineHeight: 16,
    },
    usageSection: {
        paddingHorizontal: 24,
        paddingTop: 30,
    },
    usageSteps: {
        backgroundColor: '#F1F8E9',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E8F5E9',
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    stepNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#4CAF50',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        marginTop: 2,
    },
    stepNumberText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 4,
    },
    stepDescription: {
        fontSize: 14,
        color: '#666666',
        lineHeight: 20,
    },
    buttonsContainer: {
        paddingHorizontal: 24,
        paddingTop: 30,
    },
    primaryButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryButton: {
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#4CAF50',
        backgroundColor: '#FFFFFF',
    },
    secondaryButtonText: {
        color: '#4CAF50',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default OnboardingScreen;