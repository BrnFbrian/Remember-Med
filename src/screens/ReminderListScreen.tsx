import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowLeft, Clock, Plus, RefreshCw, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, Grayscale, MainColors } from '../../constants/theme';
import { RootStackParamList } from '../../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'ReminderList'>;

interface MedicationReminder {
  id: string;
  name: string;
  time: string;
  recurrence: string;
}

export default function ReminderListScreen({ navigation }: Props) {
  const [reminders, setReminders] = useState<MedicationReminder[]>([
    {
      id: '1',
      name: 'Nome do remédio',
      time: '14:00',
      recurrence: 'A cada 12 horas',
    },
    {
      id: '2',
      name: 'Nome do remédio',
      time: '08:00',
      recurrence: 'A cada 7 dias',
    },
    {
      id: '3',
      name: 'Nome do remédio',
      time: '12:00',
      recurrence: 'A cada 1 dia',
    },
  ]);

  const handleDelete = (id: string) => {
    Alert.alert(
      'Excluir lembrente',
      'Tem certeza que deseja excluir este lembrete?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setReminders(reminders.filter((r) => r.id !== id));
          },
        },
      ],
    );
  };

  const handleAddNew = () => {
    navigation.navigate('ReminderForm');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          {/* First Row: Buttons */}
          <View style={styles.headerButtonsRow}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel="Voltar">
              <ArrowLeft color={Grayscale.gray100} size={24} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.fabButton}
              onPress={handleAddNew}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Adicionar nova receita">
              <Plus color={Colors.light.white} size={24} />
            </TouchableOpacity>
          </View>

          {/* Second Row: Text Content */}
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Minhas receitas</Text>
            <Text style={styles.headerDescription}>
              Acompanhe seus medicamentos cadastrados e gerencie lembretes
            </Text>
          </View>
        </View>

        {/* Medication List */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {reminders.map((reminder) => (
            <View key={reminder.id} style={styles.medicationCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.medicationName}>{reminder.name}</Text>
                <TouchableOpacity
                  onPress={() => handleDelete(reminder.id)}
                  style={styles.deleteButton}
                  accessibilityRole="button"
                  accessibilityLabel="Excluir lembrete">
                  <Trash2 color="#FF4444" size={20} />
                </TouchableOpacity>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.timeBadge}>
                  <Clock color={Grayscale.gray300} size={16} />
                  <Text style={styles.badgeText}> {reminder.time}</Text>
                </View>

                <View style={styles.recurrenceBadge}>
                  <RefreshCw color={Grayscale.gray300} size={16} />
                  <Text style={styles.badgeText}> {reminder.recurrence}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Grayscale.gray700,
  },
  container: {
    flex: 1,
    backgroundColor: Grayscale.gray700,
  },
  headerSection: {
    backgroundColor: Grayscale.gray700,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    width: '100%',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: MainColors.darkBlueBase,
    marginBottom: 8,
    fontFamily: Fonts.sans,
  },
  headerDescription: {
    fontSize: 14,
    color: Grayscale.gray300,
    lineHeight: 20,
    fontFamily: Fonts.sans,
  },
  fabButton: {
    width: 42,
    height: 42,
    borderRadius: 28,
    backgroundColor: MainColors.darkBlueBase,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  scrollView: {
    flex: 1,
    height: '100%',
  },
  scrollContent: {
    backgroundColor: Colors.light.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    height: '100%',
  },
  medicationCard: {
    backgroundColor: Grayscale.gray700,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
    flex: 1,
    fontFamily: Fonts.sans,
  },
  deleteButton: {
    padding: 4,
  },
  cardFooter: {
    flexDirection: 'row',
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Grayscale.gray500,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 12,
  },
  recurrenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Grayscale.gray500,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.text,
    fontFamily: Fonts.sans,
  },
});

