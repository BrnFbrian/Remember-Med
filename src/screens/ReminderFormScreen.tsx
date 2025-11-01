import DateTimePicker from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowLeft, ChevronDown, Plus } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, Grayscale } from '../../constants/theme';
import { RootStackParamList } from '../../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'ReminderForm'>;

const RECURRENCE_OPTIONS = [
  'Diário',
  'A cada 12 horas',
  'A cada 8 horas',
  'A cada 6 horas',
  'Semanal',
];

export default function ReminderFormScreen({ navigation }: Props) {
  const [medicationName, setMedicationName] = useState('');
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedRecurrence, setSelectedRecurrence] = useState<string | null>(
    null,
  );
  const [showRecurrenceModal, setShowRecurrenceModal] = useState(false);
  const [takeNow, setTakeNow] = useState(false);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
    if (selectedDate) {
      setTime(selectedDate);
    }
  };

  const handleAddReminder = () => {
    // Lógica para adicionar o lembrete
    console.log({
      medicationName,
      time: formatTime(time),
      recurrence: selectedRecurrence,
      takeNow,
    });
    // Navegar de volta ou mostrar sucesso
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Voltar">
            <ArrowLeft color={Grayscale.gray100} size={24} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Nova receita</Text>
            <Text style={styles.headerDescription}>
              Adicione a sua prescrição médica para receber lembretes de quando
              tomar seu medicamento
            </Text>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          {/* Medication Name */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Remédio</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do medicamento"
              placeholderTextColor={Grayscale.gray400}
              value={medicationName}
              onChangeText={setMedicationName}
              autoCapitalize="words"
            />
          </View>

          {/* Time */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Horário</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowTimePicker(true)}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.inputText,
                  !time && { color: Grayscale.gray400 },
                ]}>
                {formatTime(time)}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Recurrence */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Recorrência</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowRecurrenceModal(true)}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.inputText,
                  !selectedRecurrence && { color: Grayscale.gray400 },
                ]}>
                {selectedRecurrence || 'Selecione'}
              </Text>
              <ChevronDown color={Grayscale.gray400} size={20} />
            </TouchableOpacity>
          </View>

          {/* Take Now Checkbox */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setTakeNow(!takeNow)}
            activeOpacity={0.7}>
            <View style={[styles.checkbox, takeNow && styles.checkboxChecked]}>
              {takeNow && <View style={styles.checkboxInner} />}
            </View>
            <Text style={styles.checkboxLabel}>Tomar agora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddReminder}
          activeOpacity={0.8}>
          <Plus color={Colors.light.white} size={20} />
          <Text style={styles.addButtonText}> Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* Time Picker Modal */}
      {showTimePicker && (
        <>
          {Platform.OS === 'ios' ? (
            <Modal
              visible={showTimePicker}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setShowTimePicker(false)}>
              <View style={styles.timePickerModalOverlay}>
                <View style={styles.timePickerModalContent}>
                  <View style={styles.timePickerHeader}>
                    <TouchableOpacity
                      onPress={() => setShowTimePicker(false)}
                      style={styles.timePickerCancel}>
                      <Text style={styles.timePickerCancelText}>Cancelar</Text>
                    </TouchableOpacity>
                    <Text style={styles.timePickerTitle}>Selecione o horário</Text>
                    <TouchableOpacity
                      onPress={() => setShowTimePicker(false)}
                      style={styles.timePickerConfirm}>
                      <Text style={styles.timePickerConfirmText}>Confirmar</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.timePickerContainer}>
                    <DateTimePicker
                      value={time}
                      mode="time"
                      is24Hour={true}
                      display="spinner"
                      onChange={handleTimeChange}
                      style={styles.timePicker}
                      textColor={Grayscale.gray100}
                      themeVariant="light"
                    />
                  </View>
                </View>
              </View>
            </Modal>
          ) : (
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={true}
              display="spinner"
              onChange={handleTimeChange}
            />
          )}
        </>
      )}

      {/* Recurrence Modal */}
      <Modal
        visible={showRecurrenceModal}
        transparent={true}
        animationType="none"
        onRequestClose={() => setShowRecurrenceModal(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowRecurrenceModal(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione a recorrência</Text>
            {RECURRENCE_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.modalOption}
                onPress={() => {
                  setSelectedRecurrence(option);
                  setShowRecurrenceModal(false);
                }}>
                <Text
                  style={[
                    styles.modalOptionText,
                    selectedRecurrence === option &&
                      styles.modalOptionTextSelected,
                  ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: Colors.light.white,
  },
  backButton: {
    marginBottom: 16,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerContent: {
    marginTop: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF4444',
    marginBottom: 12,
    fontFamily: Fonts.sans,
  },
  headerDescription: {
    fontSize: 14,
    color: Grayscale.gray300,
    lineHeight: 20,
    fontFamily: Fonts.sans,
  },
  formSection: {
    backgroundColor: Colors.light.white,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  inputWrapper: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Grayscale.gray100,
    marginBottom: 8,
    fontFamily: Fonts.sans,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: Grayscale.gray500,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Grayscale.gray100,
    backgroundColor: Colors.light.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    fontSize: 16,
    color: Grayscale.gray100,
    fontFamily: Fonts.sans,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: Grayscale.gray400,
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    borderColor: '#FF4444',
    backgroundColor: '#FF4444',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: Colors.light.white,
  },
  checkboxLabel: {
    fontSize: 16,
    color: Grayscale.gray100,
    fontFamily: Fonts.sans,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    paddingHorizontal: 36,
    paddingVertical: 42,
    backgroundColor: Colors.light.white,
  },
  addButton: {
    backgroundColor: '#C02636',
    height: 50,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: Colors.light.white,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: Fonts.sans,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.light.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Grayscale.gray100,
    marginBottom: 16,
    paddingHorizontal: 20,
    fontFamily: Fonts.sans,
  },
  modalOption: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Grayscale.gray600,
  },
  modalOptionText: {
    fontSize: 16,
    color: Grayscale.gray300,
    fontFamily: Fonts.sans,
  },
  modalOptionTextSelected: {
    color: '#FF4444',
    fontWeight: '600',
  },
  timePickerModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  timePickerModalContent: {
    backgroundColor: Colors.light.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  timePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  timePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Grayscale.gray600,
  },
  timePickerCancel: {
    padding: 8,
    minWidth: 80,
  },
  timePickerCancelText: {
    fontSize: 16,
    color: Grayscale.gray300,
    fontFamily: Fonts.sans,
  },
  timePickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Grayscale.gray100,
    fontFamily: Fonts.sans,
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  timePickerConfirm: {
    padding: 8,
    minWidth: 80,
    alignItems: 'flex-end',
  },
  timePickerConfirmText: {
    fontSize: 16,
    color: '#FF4444',
    fontWeight: '600',
    fontFamily: Fonts.sans,
  },
  timePicker: {
    width: '100%',
    height: 216,
  },
});

