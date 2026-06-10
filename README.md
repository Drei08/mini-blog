# Mini-Blog Project

Um sistema completo de Mini-Blog desenvolvido em **React** integrado com o **Firebase (Authentication e Firestore)**. O projeto aplica o conceito de Custom Hooks para isolar toda a lógica de persistência de dados, autenticação e gerenciamento de estados.

---

## Funcionalidades Principais

### Fluxo Público (Usuário Não Autenticado)
* **Home:** Exibe todos os posts cadastrados na plataforma com ordenação cronológica e sistema de busca por tags.
* **Sobre:** Página institucional descrevendo o propósito do Mini-Blog.
* **Cadastrar:** Formulário completo de registro de usuário (Nome, E-mail e Senha) com validações em tempo real.
* **Entrar:** Sistema de login seguro integrado com as credenciais do Firebase Auth.

### Fluxo Privado (Usuário Autenticado)
* **Novo Post:** Área exclusiva para a criação de publicações, incluindo título, URL de imagem representativa, corpo do conteúdo e mapeamento automático de tags separadas por vírgula.
* **Dashboard:** Painel gerencial privado onde o usuário visualiza apenas as suas próprias postagens.
* **Ações CRUD:** Controle total do autor para **Editar** e **Excluir** seus posts diretamente pelo Dashboard.
* **Sair:** Encerramento seguro da sessão do usuário.

---

## Arquitetura e Custom Hooks

Para manter os componentes visuais limpos e focados na interface, toda a inteligência da aplicação foi modularizada em **Custom Hooks**. Cada hook possui um mecanismo interno de limpeza (`cleanup`) baseado em estados para evitar vazamentos de memória (*memory leaks*) caso o componente seja desmontado durante uma requisição assíncrona.

| Custom Hook | Descrição | Integração Firebase |
| :--- | :--- | :--- |
| `useAuthentication` | Gerencia o ciclo de vida do usuário: registro, login personalizado (com tratamento de erros de credenciais) e logout. | `Firebase Auth` |
| `useInsertDocument` | Responsável pela criação de novos registros, injetando automaticamente o `Timestamp.now()` do servidor. | `Firestore (addDoc)` |
| `useFetchDocuments` | Executa leituras em tempo real de coleções, suportando filtros flexíveis por busca de tags (`array-contains`) ou por ID do usuário (`uid`). | `Firestore (onSnapshot)` |
| `useFetchDocument` | Carrega de forma assíncrona os dados detalhados de um único documento baseado em seu ID para popular telas de edição. | `Firestore (getDoc)` |
| `useUpdateDocument` | Atualiza chaves específicas de um documento existente na nuvem de forma cirúrgica. | `Firestore (updateDoc)` |
| `useDeleteDocument` | Remove registros permanentemente do banco de dados através do ID correspondente. | `Firestore (deleteDoc)` |
| `useQuery` | Utilitário que processa parâmetros de busca da URL (`URLSearchParams`) facilitando filtros dinâmicos de navegação. | `React Router` |

---

## Tecnologias Utilizadas

* **React.js** (Componentização, Hooks, `useReducer` para controle de fluxos de dados)
* **React Router DOM** (Gerenciamento de rotas e proteção de caminhos privados)
* **Firebase v9+** (Authentication para usuários e Cloud Firestore como Banco NoSQL)
* **CSS Modules** (Escopo de estilos isolado por componente)

---

## Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Drei08/mini-blog.git
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configure as variáveis de ambiente do Firebase:**
    Crie um arquivo `.env` ou configure diretamente em seu arquivo de configuração (`src/firebase/config.js`) as credenciais do seu projeto Firebase.
4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm start
    ```