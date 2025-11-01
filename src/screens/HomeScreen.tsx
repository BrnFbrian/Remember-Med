import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ChevronRight, LogOut, StarIcon } from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Fonts, Grayscale } from "../../constants/theme";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

// Componente de loading skeleton
const LoadingSkeleton = () => (
  <SafeAreaView style={styles.safeArea} edges={["top"]}>
    <View style={styles.container}>
      {/* Header Skeleton */}
      <View style={styles.headerSection}>
        <View style={styles.userInfo}>
          <View style={[styles.profileImageContainer, styles.skeleton]} />
          <View style={styles.userTextContainer}>
            <View
              style={[
                styles.skeletonText,
                { width: 80, height: 12, marginBottom: 8 },
              ]}
            />
            <View style={[styles.skeletonText, { width: 120, height: 18 }]} />
          </View>
        </View>
        <View style={[styles.logoutButton, styles.skeleton]} />
      </View>

      {/* Content Skeleton */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.contentCard}>
          <View style={[styles.actionCard, styles.skeleton]} />
          <View
            style={[styles.actionCard, styles.secondCard, styles.skeleton]}
          />
          <View style={[styles.statsContainer, styles.skeleton]} />
        </View>
      </ScrollView>

      {/* Bottom Button Skeleton */}
      <View style={styles.bottomButtonContainer}>
        <View style={[styles.rateButton, styles.skeleton]} />
      </View>
    </View>
  </SafeAreaView>
);

// Componente animado para cards
const AnimatedCard: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const [cardAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.spring(cardAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [cardAnim, delay]);

  return (
    <Animated.View
      style={{
        opacity: cardAnim,
        transform: [
          {
            translateY: cardAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
          },
        ],
      }}
    >
      {children}
    </Animated.View>
  );
};

export default function HomeScreen({ navigation }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.95));

  useEffect(() => {
    // Simular loading inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, 800);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim]);

  const handleLogout = useCallback(() => {
    Alert.alert("Sair", "Tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => navigation.replace("Login"),
      },
    ]);
  }, [navigation]);

  const handleCardPress = useCallback(
    (route: keyof RootStackParamList) => {
      navigation.navigate(route);
    },
    [navigation]
  );

  const handleRateApp = useCallback(() => {
    // Implementar lógica de avaliação do app
    Alert.alert("Avaliar App", "Funcionalidade em desenvolvimento!");
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Top Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.userInfo}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWuga3ASnEJwjMZnvONziTb6mg_sIaT633srfuT4R_YvsTePx1wPp0B9p5UHdX4t3HWz_A_7pAr3Er5JG1XnJGsgn8hXBn4SYruEsa9nO7Yw&s=10",
                }}
                style={styles.profileImage}
                accessibilityLabel="Foto de perfil do Dr. Gregory House"
              />
            </View>
            <View style={styles.userTextContainer}>
              <Text
                style={styles.welcomeText}
                accessibilityRole="text"
                accessibilityLabel="Mensagem de boas vindas"
              >
                Boas vindas
              </Text>
              <Text
                style={styles.userName}
                accessibilityRole="text"
                accessibilityLabel="Nome do usuário"
              >
                Gregory House
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            style={styles.logoutButton}
            accessibilityRole="button"
            accessibilityLabel="Botão de sair"
            accessibilityHint="Toque para fazer logout da aplicação"
          >
            <View style={styles.logoutIconContainer}>
              <LogOut color="#FF4444" size={24} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Central Content Area */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          accessibilityRole="scrollbar"
        >
          <View style={styles.contentCard}>
            {/* Minhas receitas Card */}
            <AnimatedCard delay={200}>
              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => handleCardPress("ReminderList")}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Minhas receitas"
                accessibilityHint="Toque para ver todas as suas receitas cadastradas"
              >
                <View
                  style={[styles.iconContainer, styles.recipeIconContainer]}
                >
                  <Image
                    source={require("../../assets/images/recipe.png")}
                    style={styles.cardIcon}
                    resizeMode="contain"
                    accessibilityLabel="Ícone de receita"
                  />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>Minhas receitas</Text>
                  <Text style={styles.cardDescription}>
                    Acompanhe os medicamentos e gerencie lembretes
                  </Text>
                </View>
                <View style={styles.chevronContainer}>
                  <ChevronRight color={Grayscale.gray400} size={20} />
                </View>
              </TouchableOpacity>
            </AnimatedCard>

            {/* Nova receita Card */}
            <AnimatedCard delay={400}>
              <TouchableOpacity
                style={[styles.actionCard, styles.secondCard]}
                onPress={() => handleCardPress("ReminderForm")}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Nova receita"
                accessibilityHint="Toque para cadastrar uma nova receita"
              >
                <View style={[styles.iconContainer, styles.medsIconContainer]}>
                  <Image
                    source={require("../../assets/images/meds.png")}
                    style={styles.cardIcon}
                    resizeMode="contain"
                    accessibilityLabel="Ícone de medicamentos"
                  />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>Nova receita</Text>
                  <Text style={styles.cardDescription}>
                    Cadastre novos lembretes de receitas
                  </Text>
                </View>
                <View style={styles.chevronContainer}>
                  <ChevronRight color={Grayscale.gray400} size={20} />
                </View>
              </TouchableOpacity>
            </AnimatedCard>
          </View>
        </ScrollView>

        {/* Bottom Action Button */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={styles.rateButton}
            onPress={handleRateApp}
            activeOpacity={0.9}
            accessibilityRole="button"
            accessibilityLabel="Avaliar aplicativo"
            accessibilityHint="Toque para avaliar o aplicativo na loja"
          >
            <StarIcon color={Colors.light.white} size={20} />
            <Text style={styles.rateButtonText}> Avaliar</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Grayscale.gray600,
  },
  headerSection: {
    backgroundColor: Grayscale.gray600,
    paddingHorizontal: 20,
    paddingVertical: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
  },
  profileImageContainer: {
    marginBottom: 12,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.light.white,
  },
  userTextContainer: {
    alignItems: "flex-start",
  },
  welcomeText: {
    fontSize: 12,
    color: Grayscale.gray300,
    marginBottom: 4,
    fontFamily: Fonts.sans,
  },
  userName: {
    fontSize: 18,
    fontWeight: "700",
    color: Grayscale.gray100,
    fontFamily: Fonts.sans,
  },
  logoutButton: {
    padding: 8,
    borderRadius: 8,
  },
  logoutIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24,
  },
  contentCard: {
    backgroundColor: Colors.light.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 28,
    paddingTop: 32,
    minHeight: "100%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  actionCard: {
    backgroundColor: Grayscale.gray800,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  secondCard: {
    marginBottom: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  recipeIconContainer: {
    backgroundColor: Grayscale.gray700,
  },
  medsIconContainer: {
    backgroundColor: Grayscale.gray700,
  },
  cardIcon: {
    width: 40,
    height: 40,
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: Grayscale.gray100,
    marginBottom: 6,
    fontFamily: Fonts.sans,
  },
  cardDescription: {
    fontSize: 14,
    color: Grayscale.gray300,
    lineHeight: 20,
    fontFamily: Fonts.sans,
  },
  chevronContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.7,
  },
  statsContainer: {
    backgroundColor: Grayscale.gray700,
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: Grayscale.gray100,
    marginBottom: 4,
    fontFamily: Fonts.sans,
  },
  statLabel: {
    fontSize: 12,
    color: Grayscale.gray300,
    textAlign: "center",
    fontFamily: Fonts.sans,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Grayscale.gray500,
    marginHorizontal: 16,
  },
  bottomButtonContainer: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    backgroundColor: '#ffffff'
  },
  rateButton: {
    backgroundColor: Grayscale.gray200,
    borderRadius: 24,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: Grayscale.gray200,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  rateButtonText: {
    color: Colors.light.white,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Fonts.sans,
    marginLeft: 12,
  },
  // Skeleton styles
  skeleton: {
    backgroundColor: Grayscale.gray600,
    borderRadius: 8,
  },
  skeletonText: {
    backgroundColor: Grayscale.gray500,
    borderRadius: 4,
  },
});
