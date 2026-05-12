# 🎮 Jogo da Velha (Tic-Tac-Toe) - React Edition

Este é um projeto desenvolvido com **React**, seguindo o tutorial oficial da documentação, porém com a implementação de todos os desafios extras sugeridos para consolidar conceitos de imutabilidade, estados e renderização de listas.

## 🚀 Melhorias Implementadas

Além da lógica básica de um Jogo da Velha, esta versão inclui:

1.  **Renderização Dinâmica**: O tabuleiro (`Board`) foi reescrito para utilizar dois loops para criar os quadrados, evitando repetição de código (DRY).
2.  **Histórico de Localização**: Exibe a localização de cada movimento no formato `(linha, coluna)` na lista de histórico.
3.  **Destaque de Vitória**: Quando um jogador vence, os três quadrados que causaram a vitória são destacados.
4.  **Tratamento de Empate**: Exibição de uma mensagem específica quando o resultado termina em empate.
5.  **Ordenação de Movimentos**: Opção de ordenar a lista de histórico de jogadas em ordem crescente ou decrescente.
6.  **Status Inteligente**: Exibe "Você está na jogada nº..." para o movimento atual em vez de um botão.
7.  **Reinício Rápido**: Botão para reiniciar a partida que aparece automaticamente ao final do jogo.

## 🛠️ Tecnologias

- **React 19**
- **JavaScript (ES6+)**
- **CSS3** para estilização e efeitos de interface.

## 💻 Como Rodar o Projeto

```bash
# Instalar as dependências
npm install

# Iniciar o servidor de desenvolvimento
npm start
