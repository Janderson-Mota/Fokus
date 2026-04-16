const html = document.querySelector('html');
const focobt = document.querySelector('.app__card-button--foco');
const curtobt = document.querySelector('.app__card-button--curto');
const longobt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sons/play.wav');
const audioPausa = new Audio('./sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3');
const btComecar = document.querySelector('#start-pause-text');
const btComecarIcon = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');


let tempoDecorridoEmSegundos = 1500; // 25 minutos em segundos

let intervalo = null;

musica.loop = true;
musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});


focobt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarConxtexto('foco');
});

curtobt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarConxtexto('descanso-curto');
});


longobt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarConxtexto('descanso-longo');
});


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
}

function zerarOuParar() {
    clearInterval(intervalo);
    btComecarIcon.setAttribute('src', './imagens/play_arrow.png');
    btComecar.innerHTML = 'Começar';
    intervalo = null;
}

startPauseBt.addEventListener('click', () => {
    iniciarOuPausar();
});

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {
        minute: '2-digit',
        second: '2-digit'
    });
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();