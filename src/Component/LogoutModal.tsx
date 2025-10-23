import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// ===== TYPE DEFINITIONS =====
interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

// ===== COMPONENT =====
/**
 * LogoutModal - Modal สำหรับยืนยันการ Logout
 * 
 * @param visible - แสดง/ซ่อน modal
 * @param onClose - callback เมื่อกดปิด modal
 * @param onLogout - callback เมื่อยืนยัน logout
 */
const LogoutModal: React.FC<LogoutModalProps> = ({ visible, onClose, onLogout }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Backdrop - พื้นหลังมืดๆ */}
      <TouchableOpacity 
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      >
        {/* Modal Content */}
        <View style={styles.modalContainer}>
          <TouchableOpacity 
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()} // ป้องกันไม่ให้ปิดเมื่อกดใน modal
          >
            <View style={styles.modalContent}>
              {/* Icon */}
              <View style={styles.iconContainer}>
                <MaterialIcons name="logout" size={48} color="#EF4444" />
              </View>

              {/* Title */}
              <Text style={styles.title}>ออกจากระบบ</Text>

              {/* Message */}
              <Text style={styles.message}>
                คุณต้องการออกจากระบบใช่หรือไม่?
              </Text>

              {/* Buttons */}
              <View style={styles.buttonContainer}>
                {/* Cancel Button */}
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={onClose}
                  activeOpacity={0.8}
                >
                  <Text style={styles.cancelButtonText}>ยกเลิก</Text>
                </TouchableOpacity>

                {/* Logout Button */}
                <TouchableOpacity 
                  style={styles.logoutButton}
                  onPress={onLogout}
                  activeOpacity={0.8}
                >
                  <Text style={styles.logoutButtonText}>ออกจากระบบ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// ===== STYLES =====
const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width - 64,
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
  },
  logoutButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EF4444',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default LogoutModal;