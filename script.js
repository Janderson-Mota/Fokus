// Seleção de elementos do DOM
const html = document.querySelector('html');
const focobt = document.querySelector('.app__card-button--foco');
const curtobt = document.querySelector('.app__card-button--curto');
const longobt = document.querySelector('.app__card-button--longo');

// Elementos relacionados à música
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');

// Elementos relacionados ao timer e controle de música
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sons/play.wav');
const audioPausa = new Audio('./sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3');

// Elementos relacionados ao controle de tempo e volume
const btComecar = document.querySelector('#start-pause-text');
const btComecarIcon = document.querySelector('.app__card-primary-butto-icon');
const startPauseBt = document.querySelector('#start-pause');
const resetBtn = document.querySelector('#reset-timer');
const tempoNaTela = document.querySelector('#timer');

// Elementos relacionados ao controle de volume e seleção de música
const volumeSlider = document.getElementById('volume-slider');
const volumeValue  = document.getElementById('volume-value');
const wave1        = document.getElementById('volume-wave-1');
const volumeBtn    = document.getElementById('volume-btn');
const musicChips   = document.querySelectorAll('.app__music-chip');
const wave2        = document.getElementById('volume-wave-2');
const musicPicker  = document.getElementById('music-picker');


let tempoDecorridoEmSegundos = 1500; 
let intervalo = null;
let lastVolume = 70;
let currentContext = 'foco';
musica.loop = true;

// Função para obter a fonte da música com base na trilha selecionada
function obterFonteMusica(trilha) {
    switch (trilha) {
        case 'lofi':
            return './sons/luna-rise-part-one.mp3';
        case 'rain':
            return './sons/luna-rise-part-one.mp3';
        case 'forest':
            return './sons/luna-rise-part-one.mp3';
        case 'cafe':
            return './sons/luna-rise-part-one.mp3';
        case 'space':
            return './sons/luna-rise-part-one.mp3';
        case 'waves':
            return './sons/luna-rise-part-one.mp3';
        default:
            return './sons/luna-rise-part-one.mp3';
    }
}

// Função para obter o tempo de parada com base no contexto atual
function obterTempoParadao(contexto) {
    switch (contexto) {
        case 'foco':
            return 1500;
        case 'descanso-curto':
            return 300;
        case 'descanso-longo':
            return 900;
        default:
            return 1500;
    }
}

// Função para definir o estado do botão de zerar
function definirEstadoBotaoZerar() {
    if (!resetBtn) return;
    resetBtn.disabled = !!intervalo;
}

// Função para zerar o temporizador
function zerarTemporizador() {
    zerarOuParar();
    tempoDecorridoEmSegundos = obterTempoParadao(currentContext);
    mostrarTempo();
}

// Configuração do evento para alternar a música de foco
musicaFocoInput.addEventListener('change', () => {
    if (musicaFocoInput.checked) {
        musica.play();
    } else {
        musica.pause();
    }
});

// Função para alterar o contexto do aplicativo
function alterarConxtexto(contexto){

    mostrarTempo();
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = 'Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>';
            break;
        case 'descanso-curto':
            titulo.innerHTML = 'Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curtar!</strong>';
            break;
        case 'descanso-longo':
            titulo.innerHTML = 'Hora de voltar à superficie.<br><strong class="app__title-strong">Faça uma pausa longa!</strong>';
            break;
    }

    if (contexto === 'foco'){

        focobt.classList.add('active');
        curtobt.classList.remove('active');
        longobt.classList.remove('active');

    } else if(contexto === 'descanso-curto'){

        curtobt.classList.add('active');
        focobt.classList.remove('active');
        longobt.classList.remove('active');

    } else if(contexto === 'descanso-longo'){

        longobt.classList.add('active');
        focobt.classList.remove('active');
        curtobt.classList.remove('active');
    }
}

// Configurações de contexto
focobt.addEventListener('click', () => {
    currentContext = 'foco';
    tempoDecorridoEmSegundos = obterTempoParadao(currentContext);
    alterarConxtexto(currentContext);
});

// Configurações de contexto
curtobt.addEventListener('click', () => {
    currentContext = 'descanso-curto';
    tempoDecorridoEmSegundos = obterTempoParadao(currentContext);
    alterarConxtexto(currentContext);
});

// Configurações de contexto
longobt.addEventListener('click', () => {
    currentContext = 'descanso-longo';
    tempoDecorridoEmSegundos = obterTempoParadao(currentContext);
    alterarConxtexto(currentContext);
});


// Função para mostrar o tempo formatado na tela
function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {
        minute: '2-digit',
        second: '2-digit'
    });
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

// Função para a contagem regressiva do timer
const contagemregressiva = () =>{
    
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play();
        alert('Tempo esgotado!');
        zerarOuParar();
        return;
    }

    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}
// Função para iniciar ou pausar o timer
const iniciarOuPausar= () =>{

    if (intervalo) {
        audioPausa.play(); 
        zerarOuParar();
        return;
    }
     
    audioPlay.play(); 
    btComecarIcon.setAttribute('src', './imagens/pause.png');
    btComecar.innerHTML = 'Pausar';
    intervalo = setInterval(contagemregressiva, 1000);
    definirEstadoBotaoZerar();
}

// Função para zerar ou parar o timer
function zerarOuParar() {
    clearInterval(intervalo);
    btComecarIcon.setAttribute('src', './imagens/play_arrow.png');
    btComecar.innerHTML = 'Começar';
    intervalo = null;
    definirEstadoBotaoZerar();
}

// Configuração do evento para o botão de iniciar/pausar
startPauseBt.addEventListener('click', () => {
    iniciarOuPausar();
});


// Configurações de volume
definirVolume(volumeSlider.value || lastVolume);

// Função para definir o volume da música
function definirVolume(valor) {
    const volume = Number(valor);
    musica.volume = volume / 100;
    volumeSlider.value = volume;
    volumeValue.textContent = volume;
    volumeSlider.style.setProperty('--vol', volume);
    atualizarIconeVolume(volume);
}

// Configuração do evento para o controle deslizante de volume
volumeSlider.addEventListener('input', event => {
    definirVolume(event.target.value);
});

// Configuração do evento para o botão de mudo
volumeBtn.addEventListener('click', () => {
    if (+volumeSlider.value > 0) {
        lastVolume = +volumeSlider.value;
        definirVolume(0);
    } else {
        definirVolume(lastVolume);
    }
});

// Configuração do evento para as chips de música
musicChips.forEach(chip => {
    chip.addEventListener('click', () => {
        musicChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const musicSrc = obterFonteMusica(chip.dataset.track);
        musica.src = musicSrc;

        if (musicaFocoInput.checked) {
            musica.play();
        }
    });
});

// Configuração do evento para o seletor de música
if (resetBtn) {
    resetBtn.addEventListener('click', zerarTemporizador);
}

// Função para atualizar a opacidade dos ícones de volume
function atualizarIconeVolume(v) {
    wave1.style.opacity = v > 0 ? '1' : '0.2';
    wave2.style.opacity = v > 30 ? '1' : '0.2';
}

// Inicialização do aplicativo
mostrarTempo();
definirEstadoBotaoZerar();