# 💊 Remember Med

Um aplicativo React Native para gerenciamento de medicamentos, desenvolvido com Expo e React Navigation.

## 📋 Sobre o Projeto

O **Remember Med** é um aplicativo mobile desenvolvido para auxiliar usuários no gerenciamento e organização de seus medicamentos. O projeto foca na estruturação da navegação utilizando React Navigation, criando um fluxo de autenticação e navegação principal conforme design pré-definido.

### 🎯 Objetivo da Atividade

Esta aplicação foi desenvolvida como parte de uma **Atividade Prática** com o objetivo de aplicar os conceitos de navegação em React Native, criando a estrutura de telas e o fluxo de usuário utilizando React Navigation. O foco principal está na criação do esqueleto de navegação, sem a necessidade de implementar lógicas de negócio complexas nesta fase inicial.

## 👨‍💻 Desenvolvedor

**Felipe Brian**  
Matrícula: 2210360  
Instituição: UniEvangélica

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **TypeScript** - Tipagem estática para JavaScript
- **@react-navigation/native** - Biblioteca de navegação principal
- **@react-navigation/native-stack** - Navegação em pilha (stack navigation)
- **@react-navigation/bottom-tabs** - Navegação por abas inferiores

### Principais Dependências

- `react`: ^19.1.0
- `react-native`: 0.81.5
- `expo`: ~54.0.20
- `@react-navigation/native`: ^7.1.8
- `@react-navigation/native-stack`: ^7.6.1
- `@react-navigation/bottom-tabs`: ^7.4.0

## 📁 Estrutura do Projeto

```
Remember_Med/
├── src/
│   └── screens/           # Telas do aplicativo
│       ├── SplashScreen.tsx
│       ├── LoginScreen.tsx
│       ├── HomeScreen.tsx
│       ├── ReminderListScreen.tsx
│       └── ReminderFormScreen.tsx
├── navigation/
│   └── AppNavigator.tsx   # Configuração da navegação
├── components/            # Componentes reutilizáveis
├── assets/               # Imagens e recursos visuais
├── constants/            # Constantes do projeto
├── hooks/                # Custom hooks
└── App.tsx               # Componente raiz
```

## 🎨 Telas do Aplicativo

1. **SplashScreen** - Tela inicial de apresentação
2. **LoginScreen** - Tela de autenticação/login
3. **HomeScreen** - Tela principal do aplicativo
4. **ReminderListScreen** - Lista de lembretes de medicamentos
5. **ReminderFormScreen** - Formulário para criar/editar lembretes

## 🚀 Como Instalar e Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI (instalado globalmente ou via npx)
- Emulador Android/iOS ou aplicativo Expo Go no celular

### Instalação

1. Clone o repositório:

**Via HTTPS:**
```bash
git clone https://github.com/BrnFbrian/Remember-Med.git
```

**Via SSH:**
```bash
git clone git@github.com:BrnFbrian/Remember-Med.git
```

2. Navegue até a pasta do projeto:

```bash
cd Remember-Med
```

3. Instale as dependências:

```bash
npm install
```

ou

```bash
yarn install
```

### Executando o Projeto

1. Inicie o servidor de desenvolvimento:

```bash
npm start
```

ou

```bash
npx expo start
```

2. Escolha uma das opções para visualizar o app:

   - **Development Build**: Para builds de desenvolvimento
   - **Android Emulator**: Para executar no emulador Android
   - **iOS Simulator**: Para executar no simulador iOS (apenas macOS)
   - **Expo Go**: Para testar usando o app Expo Go no seu dispositivo físico

### Scripts Disponíveis

```bash
npm start          # Inicia o servidor Expo
npm run android    # Executa no Android
npm run ios        # Executa no iOS
npm run web        # Executa na web
npm run lint       # Executa o linter
```

## 📱 Funcionalidades

- ✅ Navegação entre telas utilizando React Navigation
- ✅ Fluxo de autenticação estruturado
- ✅ Navegação em pilha (Stack Navigation)
- ✅ Navegação por abas (Tab Navigation)
- ✅ Estrutura de telas preparada para implementação futura

## 🔄 Status do Projeto

Este projeto está em fase inicial de desenvolvimento, focando na estruturação da navegação e criação do esqueleto das telas. As funcionalidades de negócio (como chamadas de API e gerenciamento de estado avançado) serão implementadas em fases posteriores.

## 📚 Recursos de Aprendizado

### Documentação Oficial

- [React Navigation](https://reactnavigation.org/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)

### Tutoriais Recomendados

- [React Navigation Getting Started](https://reactnavigation.org/docs/getting-started)
- [Expo Router Tutorial](https://docs.expo.dev/router/introduction/)

## 📝 Notas de Desenvolvimento

- Este projeto utiliza file-based routing do Expo Router
- A navegação está configurada em `navigation/AppNavigator.tsx`
- As telas estão localizadas em `src/screens/`
- O projeto utiliza TypeScript para tipagem estática

## 🤝 Contribuindo

Este é um projeto acadêmico desenvolvido como parte de uma atividade prática. Contribuições e sugestões são bem-vindas!

## 📄 Licença

Este projeto é de uso acadêmico.

---

Desenvolvido por Felipe Brian - UniEvangélica
