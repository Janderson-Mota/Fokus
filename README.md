# 🎯 Fokus

Um timer Pomodoro simples com uma interface baseada em **glassmorphism**. Nada de revolucionário aqui, apenas uma ferramenta visualmente agradável para gerenciar seus blocos de foco e descanso sem firulas.

## 🛠️ O que ele entrega
* **Controle de Ciclos**: Três botões para alternar entre Foco, Descanso Curto e Descanso Longo.
* **Visual Adaptativo**: O fundo e as cores mudam de acordo com o modo selecionado para dar um feedback visual rápido.
* **Áudio de Fundo**: Seletor de sons ambiente (lo-fi, chuva, etc.) e controle de volume integrado.
* **Feedback Sonoro**: Avisos sonoros para quando você inicia, pausa ou termina um cronômetro.

## 🎧 Personalização de Música
Se as trilhas padrão não forem sua praia, é fácil colocar as suas:

1. Jogue seus arquivos `.mp3` na pasta `/sons`.
2. No `script.js`, atualize os caminhos dentro da função `obterFonteMusica(trilha)`.
3. Pronto, o player vai puxar os seus arquivos automaticamente.

## 💻 Tech Stack
* **HTML5/CSS3**: Layout moderno com variáveis CSS e animações fluidas.
* **Vanilla JS**: Lógica de temporizador e manipulação de áudio sem dependências externas.
