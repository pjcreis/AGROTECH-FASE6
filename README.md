# Sistema Orquestrador de Micro-Fazendas Verticais (Fase 6)

Versão da Fase 6, construída com React e Vite a partir do projeto da Fase 5.

## Como executar

Requisito: Node.js instalado.

```
npm install
npm run dev
```

Abra o endereço mostrado no terminal (por padrão http://localhost:5173).

Para gerar a versão de produção, use `npm run build`. Os arquivos ficam na pasta `dist`.

## Nova funcionalidade da Fase 6: Rotinas de manejo

A página **Manejo** mostra um passo a passo do cultivo, pensado para quem não entende
de plantio.

Ao registrar um plantio, o sistema monta o plano daquela cultura, e não uma lista
genérica. As atividades que se repetem são expandidas em ocorrências numeradas, como
Rega 26 de 30, e ficam na mesma lista das atividades de uma vez só, como o desbaste da
cenoura no dia 20. Tudo aparece em ordem de dia e agrupado por semana do ciclo.

As doses são calculadas pela quantidade de mudas. Doze cenouras pedem 2,4 litros por
rega, quatro alfaces pedem 0,6 litro.

Alface, rúcula e cenoura já têm receita própria. As demais culturas usam uma rotina
básica, e isso aparece na tela com um selo. Novas receitas entram conforme o sistema
evolui.

A tela mostra um plantio por vez, com seletor no topo, e tem filtro por todas,
pendentes e em atraso. O usuário também pode acrescentar atividades próprias, de
qualquer tipo, com ou sem repetição.

É a última das seis funcionalidades previstas no escopo original do projeto.

## Conceitos de React aplicados

- **Componentes**: cada parte da interface é um componente em `src/components`, com a
  primeira letra maiúscula. `Cabecalho` e `Rodape` são reutilizados em toda a aplicação,
  e `StatCard` é reutilizado pelo Painel e pelo Manejo.
- **JSX**: a estrutura das telas usa `className` no lugar de `class` e insere variáveis
  com chaves.
- **Props**: `App` passa dados e funções para os componentes filhos. Por exemplo,
  `Painel` recebe a micro-fazenda e as funções de adicionar, colher e simular.
- **useState**: guarda o estado da aplicação. Fica em `App` o estado principal e em cada
  formulário o estado dos seus próprios campos.
- **useEffect**: em `Avisos.jsx`, agenda o fechamento automático da mensagem quando o
  componente é montado e cancela o agendamento quando ele é desmontado. Em `Contato.jsx`,
  roda somente quando o valor do campo mensagem muda.
- **React Router DOM**: a navegação entre as páginas usa rotas de verdade, com `NavLink`
  marcando a página atual.

## Estrutura

- `index.html` — arquivo base do Vite, com a `<div id="root">`.
- `src/main.jsx` — renderiza o componente `App` dentro da `div root`.
- `src/App.jsx` — componente principal, com o estado e as rotas.
- `src/components/` — componentes da aplicação.
- `src/models/` — as classes do diagrama UML: `Cultura`, `RotinaCultura`, `Plantio`,
  `Tarefa` (com `Rega`, `Adubacao`, `Inspecao` e `Personalizada`), `Colheita` e
  `MicroFazenda`.
- `src/dados/culturas.js` — catálogo de culturas.
- `src/dados/rotinas.js` — receitas de manejo de alface, rúcula e cenoura.
- `src/css/estilo.css` — estilos do projeto.
- `public/_redirects` — faz o servidor de hospedagem entregar as rotas do React Router.

## Páginas

- **Home** — apresentação e link do pitch vídeo.
- **O Sistema** — funcionalidades e público.
- **Guia de Culturas** — catálogo com busca e detalhes (funcionalidade da Fase 5).
- **Painel** — registro de plantios, simulação de dias, colheita e histórico.
- **Manejo** — rotinas de manejo por plantio (funcionalidade da Fase 6).
- **Fale Conosco** — formulário com validações.
