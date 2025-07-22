# MindBuddy HTML to Figma Import Guide

Este guia explica como importar os wireframes do MindBuddy para o Figma usando o plugin html.to.design.

## 📋 Pré-requisitos

1. **Conta Figma** (gratuita ou paga)
2. **Plugin html.to.design** instalado no Figma
3. **Navegador Chrome** ou Safari

## 🚀 Passo a Passo

### 1. Instalar o Plugin no Figma

1. Abra o Figma
2. Vá para **Community** → **Plugins**
3. Procure por **"html.to.design"**
4. Clique em **"Install"**

### 2. Preparar os Arquivos HTML

Já preparei todos os 42 screens em HTML otimizado para importação:

```
html-snippets/
├── index.html          # Página índice com links para todos os screens
├── onboarding/         # 5 screens de onboarding
├── authentication/     # 6 screens de autenticação
├── dashboard/          # 2 screens do dashboard
├── health/            # 6 screens de saúde
├── rewards/           # 5 screens de recompensas
├── profile/           # 10 screens de perfil
├── errors/            # 5 screens de erro
└── legal/             # 3 screens legais
```

### 3. Importar para o Figma

#### Método 1: Via Plugin (Recomendado)

1. Abra `html-snippets/index.html` no seu navegador
2. Clique no screen que deseja importar
3. Selecione todo o conteúdo (`Cmd+A` ou `Ctrl+A`)
4. Copie (`Cmd+C` ou `Ctrl+C`)
5. No Figma:
   - Crie um novo arquivo ou abra um existente
   - Vá para **Plugins** → **html.to.design**
   - Cole o HTML no campo de texto
   - Clique em **"Import to Figma"**

#### Método 2: Via URL Local

1. Abra um servidor local na pasta do projeto:
   ```bash
   cd html-snippets
   python3 -m http.server 8000
   ```
2. No plugin html.to.design, use a URL:
   ```
   http://localhost:8000/dashboard/dashboard.html
   ```

### 4. Organizar no Figma

Estrutura recomendada:

```
MindBuddy Wireframes/
├── 📱 Onboarding
├── 🔐 Authentication  
├── 📊 Dashboard
├── ❤️ Health
├── 🎁 Rewards
├── 👤 Profile
├── ⚠️ Errors
└── 📜 Legal
```

## 🎨 Dicas de Importação

### Configurações do Plugin

- **Width**: 393px (iPhone 14 Pro)
- **Height**: 852px
- **Scale**: 1x
- **Font**: System Default (SF Pro)

### Após Importar

1. **Agrupar elementos** relacionados
2. **Criar componentes** para elementos repetidos
3. **Aplicar Auto Layout** onde apropriado
4. **Adicionar interações** e protótipos

## ⚡ Importação em Lote

Para importar múltiplos screens rapidamente:

1. Abra várias abas no navegador com os HTMLs
2. Use o atalho do plugin no Figma
3. Cole e importe sequencialmente
4. Use **Cmd+D** para duplicar o espaçamento

## 🛠️ Solução de Problemas

### Problema: Fontes não aparecem corretamente
**Solução**: Instale SF Pro Display no seu sistema ou substitua por Inter no Figma

### Problema: Cores não correspondem
**Solução**: Verifique se as variáveis CSS foram aplicadas corretamente

### Problema: Layout quebrado
**Solução**: Certifique-se de copiar TODO o HTML, incluindo `<html>` tags

### Problema: Plugin não funciona
**Solução**: 
1. Tente o plugin "Web to Figma" como alternativa
2. Use screenshots como fallback (veja WIREFRAMES_EXPORT_GUIDE.md)

## 📱 Especificações Técnicas

- **Viewport**: 393x852px (iPhone 14 Pro)
- **Fonte Principal**: SF Pro Display
- **Cores Primárias**: 
  - Primary: #007AFF
  - Background: #FFFFFF
  - Text: #000000
  - Gray: #8E8E93

## 🔗 Links Úteis

- [html.to.design Plugin](https://www.figma.com/community/plugin/1159123024924461424/)
- [Figma Best Practices](https://www.figma.com/best-practices/)
- [MindBuddy Website](https://mindbuddy.pt)

## 📧 Suporte

Para questões sobre os wireframes: info@mindbuddy.pt

---

**Nota**: Os arquivos HTML foram otimizados para importação no Figma, incluindo todos os estilos CSS inline e estrutura limpa.