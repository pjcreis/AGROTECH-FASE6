# Sistema Orquestrador de Micro-Fazendas Verticais (Fase 6)

Versão da Fase 6, construída com React e Vite a partir do projeto da Fase 5.

## Como executar

Requisito: Node.js instalado.

```
npm install
npm run dev
```

Abra o endereço mostrado no terminal (por padrão http://localhost:5173).

## Nova funcionalidade da Fase 6: Rotinas de manejo

A página **Manejo** mostra um passo a passo do cultivo, pensado para quem não entende
de plantio.

Ao registrar um plantio, o sistema monta o plano daquela cultura. Alface, rúcula e 
cenoura já têm receita própria. As demais culturas usam uma rotina básica, e isso 
aparece na tela com um selo. Novas receitas entram conforme o sistema evolui.

A tela mostra um plantio por vez, com seletor no topo, e tem filtro por todas,
pendentes e em atraso. O usuário também pode acrescentar atividades próprias, de
qualquer tipo, com ou sem repetição.

## Estrutura

- `index.html` - arquivo base do Vite, com a `<div id="root">`.
- `src/main.jsx` - renderiza o componente `App` dentro da `div root`.
- `src/App.jsx` - componente principal, com o estado e as rotas.
- `src/components/` - componentes da aplicação.
- `src/models/` - as classes do diagrama UML: `Cultura`, `RotinaCultura`, `Plantio`,
  `Tarefa` (com `Rega`, `Adubacao`, `Inspecao` e `Personalizada`), `Colheita` e
  `MicroFazenda`.
- `src/dados/culturas.js` - catálogo de culturas.
- `src/dados/rotinas.js` - receitas de manejo de alface, rúcula e cenoura.
- `src/css/estilo.css` - estilos do projeto.
- `public/_redirects` - faz o servidor de hospedagem entregar as rotas do React Router.

## Páginas

- **Home** - apresentação e link do pitch vídeo.
- **O Sistema** - funcionalidades e público.
- **Guia de Culturas** - catálogo com busca e detalhes (funcionalidade da Fase 5).
- **Painel** - registro de plantios, simulação de dias, colheita e histórico.
- **Manejo** - rotinas de manejo por plantio (funcionalidade da Fase 6).
- **Fale Conosco** - formulário com validações.
