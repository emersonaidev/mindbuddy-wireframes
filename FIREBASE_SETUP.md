# Firebase Setup Guide - MindBuddy Wireframes

## ⚠️ Erro Atual: "auth/invalid-api-key"

O erro que está aparecendo indica que a configuração do Firebase está incorreta. O arquivo `firebase-config.js` estava usando uma chave privada ao invés da API Key pública do Firebase.

## Como Corrigir

### 1. Criar Projeto no Firebase (se ainda não tiver)
1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Criar um projeto"
3. Nome: "mindbuddy-wireframes" (ou outro de sua preferência)
4. Desative o Google Analytics (não é necessário)
5. Clique em "Criar projeto"

### 2. Ativar Autenticação Google
1. No painel do Firebase, clique em **Authentication**
2. Clique em **Começar**
3. Vá para a aba **Método de login**
4. Clique em **Google**
5. Ative o toggle **Ativar**
6. Adicione seu email em **E-mail de suporte do projeto**
7. Clique em **Salvar**

### 3. Obter Configuração Correta
1. Clique no ícone de engrenagem ⚙️ ao lado de "Visão geral do projeto"
2. Selecione **Configurações do projeto**
3. Role até **Seus aplicativos**
4. Clique no ícone **</>** (Web)
5. Registre o app com um apelido (ex: "MindBuddy Wireframes")
6. Clique em **Registrar app**
7. **IMPORTANTE**: Copie a configuração que aparece

A configuração correta deve parecer com isto:
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyDtLk2Fz3...", // Começa com AIza
    authDomain: "mindbuddy-wireframes.firebaseapp.com",
    projectId: "mindbuddy-wireframes",
    storageBucket: "mindbuddy-wireframes.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};
```

### 4. Atualizar firebase-config.js
1. Abra o arquivo `firebase-config.js`
2. Substitua TODO o conteúdo da `const firebaseConfig` com a configuração copiada
3. Salve o arquivo

### 5. Adicionar Domínios Autorizados
1. No Firebase Console, vá para **Authentication** → **Settings**
2. Clique na aba **Domínios autorizados**
3. Adicione (se necessário):
   - `localhost` (já está por padrão)
   - `127.0.0.1`
   - `emersonaidev.github.io` (se usar GitHub Pages)

### 6. Testar
1. Abra o `index.html` no navegador
2. Deve aparecer o botão "Sign in with Google"
3. Clique e faça login
4. Após autenticar, você terá acesso aos wireframes

## Solução de Problemas

### Erro: "auth/invalid-api-key"
- **Causa**: A API Key está no formato errado
- **Solução**: A API Key deve começar com `AIza...`, NÃO deve ser uma chave privada com `-----BEGIN PRIVATE KEY-----`

### Erro: "auth/unauthorized-domain"
- **Causa**: O domínio não está autorizado
- **Solução**: Adicione seu domínio em Authentication → Settings → Domínios autorizados

### Erro: "Failed to load authentication system"
- **Causa**: Configuração do Firebase incorreta
- **Solução**: Verifique se copiou a configuração correta do Firebase Console

## Exemplo de Configuração Correta

```javascript
// firebase-config.js
const firebaseConfig = {
    apiKey: "AIzaSyDtLk2Fz3bCwPm9wF5vB6nH8jK4lM2oP3q", // Exemplo
    authDomain: "meu-projeto.firebaseapp.com",
    projectId: "meu-projeto",
    storageBucket: "meu-projeto.appspot.com",
    messagingSenderId: "987654321098",
    appId: "1:987654321098:web:fedcba9876543210"
};
```

## Notas de Segurança
- A API Key do Firebase é pública (é restrita por domínio)
- NUNCA use chaves privadas de service account no código cliente
- A configuração do Firebase pode ser commitada no GitHub (é pública)