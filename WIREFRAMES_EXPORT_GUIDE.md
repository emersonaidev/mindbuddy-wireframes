# MindBuddy Wireframes Export Guide

Os arquivos SVG com `foreignObject` não são compatíveis com o Figma. Aqui estão as melhores alternativas para exportar os wireframes:

## 🎯 Método Recomendado: Screenshots Manuais

### Passo 1: Abrir o Sistema de Wireframes
1. Abra o arquivo `index.html` no Chrome ou Safari
2. Faça login se necessário

### Passo 2: Capturar Cada Tela
1. **Clique duas vezes** em cada wireframe para abrir o modo focus
2. Pressione `F12` para abrir o Developer Tools
3. Clique no ícone de dispositivo móvel (ou pressione `Cmd+Shift+M`)
4. Selecione "iPhone 14 Pro" ou configure manualmente:
   - Width: 393px
   - Height: 852px
   - Device pixel ratio: 2

### Passo 3: Tirar Screenshot
1. No Chrome: Clique nos 3 pontos no DevTools > "Capture screenshot"
2. No Safari: Develop > Show Web Inspector > Elements > Node screenshot
3. Salve com nome descritivo (ex: `auth-login.png`)

## 📁 Estrutura de Organização

Organize os screenshots em pastas:

```
wireframes/
├── onboarding/
│   ├── welcome.png
│   ├── how-it-works.png
│   ├── choose-data.png
│   ├── connect-data.png
│   └── success.png
├── authentication/
│   ├── login.png
│   ├── create-account.png
│   ├── email-verification.png
│   ├── forgot-password.png
│   ├── sso-apple.png
│   └── sso-google.png
├── dashboard/
│   ├── main.png
│   └── insights.png
├── health/
│   ├── overview.png
│   ├── resilience-score.png
│   ├── heart-rate.png
│   ├── hrv-detail.png
│   ├── sleep-detail.png
│   └── activity-detail.png
├── rewards/
│   ├── hub.png
│   ├── earn-more.png
│   ├── exchange.png
│   ├── withdraw.png
│   └── history.png
├── profile/
│   ├── main.png
│   ├── personal-info.png
│   ├── security.png
│   ├── notifications.png
│   ├── data-permissions.png
│   ├── data-reputation.png
│   ├── connected-devices.png
│   ├── wallet-connection.png
│   ├── subscription.png
│   └── help-center.png
├── errors/
│   ├── empty-state.png
│   ├── generic-error.png
│   ├── network-error.png
│   ├── permission-denied.png
│   └── loading.png
└── legal/
    ├── terms.png
    ├── privacy.png
    └── security-compliance.png
```

## 🎨 Importar para o Figma

### Método 1: Drag & Drop
1. Abra o Figma
2. Crie um novo arquivo
3. Arraste todos os PNGs para o Figma
4. Organize em frames de 393x852

### Método 2: Import em Massa
1. No Figma: File > Place Image (ou `Cmd+Shift+K`)
2. Selecione múltiplos arquivos PNG
3. Clique para posicionar cada um

### Método 3: Plugin "Figma Autoname"
1. Instale o plugin "Rename It"
2. Importe todas as imagens
3. Use o plugin para renomear baseado na estrutura de pastas

## 💡 Dicas Importantes

1. **Resolução**: Sempre capture em 2x para melhor qualidade
2. **Consistência**: Use sempre o mesmo tamanho de viewport
3. **Nomeação**: Use nomes descritivos e consistentes
4. **Organização**: Crie páginas separadas no Figma para cada categoria

## 🚀 Alternativa Automatizada

Se preferir automatizar, instale o Playwright:

```bash
pip install playwright
playwright install chromium
python3 capture-screens.py
```

Isso capturará automaticamente todos os 42 screens.

## 📱 Lista Completa de Telas

Total: **42 telas** divididas em 8 categorias:
- Onboarding: 5 telas
- Authentication: 6 telas  
- Dashboard: 2 telas
- Health: 6 telas
- Rewards: 5 telas
- Profile: 10 telas
- Errors: 5 telas
- Legal: 3 telas

---

Para questões ou suporte: info@mindbuddy.pt