import { Component, OnInit } from '@angular/core';
import { container } from '@angular/core/src/render3/instructions';
import { Button } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  posicoes: string[] = ["", "", "", "", "", "", "", "", "",];
  jogadasX: number[] = [];
  jogadasY: number[] = [];
  jogadorDaVez: string = "X";
  escolhidos: number[] = [];
  rodadas: number = 0;
  vitX: number = JSON.parse(localStorage.getItem("vitoriasX")) || 0
  vitY: number = JSON.parse(localStorage.getItem("vitoriasY")) || 0
  fraseVencedor: string = "";
  vencedor: string = "";

  ngOnInit(): void {
    console.log("sometimes i feel that i cant die");
  }

  posicoesParaGanhar = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  mostraIndex(index: number) {
    
    if (this.posicoes[index] == "") {
      this.rodadas ++;
      this.posicoes[index] = this.jogadorDaVez
      this.escolhidos.push(index)
      this.colocaJogada(index)
      if (this.verificaVencedor(this.jogadorDaVez)) {
        this.vencedor = this.jogadorDaVez;
        this.fraseVencedor = "Vencedor foi o " + this.vencedor
        this.encerraJogo();
        this.abriModal();
        setTimeout(this.fechaModal, 5000);
      }
      this.verificaVez();
    } else {
      console.log("ja tem amigao")
    }
    if (this.rodadas == 9 && this.vencedor == "") {
      this.fraseVencedor = "Infelizmente deu velha, tente novamente!";
      this.abriModal()
    }
  }


  colocaJogada(index: number): void {
    if (this.jogadorDaVez === "X") {
      this.jogadasX.push(index);
    } else {
      this.jogadasY.push(index);
    }
  }

  verificaVez(): void {
    if (this.jogadorDaVez === "X") {
      this.jogadorDaVez = "O"
    } else {
      this.jogadorDaVez = "X"
    }
  }

  verificaVencedor(jogadorDaVez: string): boolean {
    if (jogadorDaVez == "X"){
        for (let i = 0; i < this.posicoesParaGanhar.length; i ++) {
          let contadorDeAcertos = 0;
          for (let j = 0; j < this.jogadasX.length; j ++) {
            if (this.posicoesParaGanhar[i][0] == this.jogadasX[j] || this.posicoesParaGanhar[i][1] == this.jogadasX[j] || this.posicoesParaGanhar[i][2] == this.jogadasX[j]) {
              contadorDeAcertos ++
            } 
          }
          if (contadorDeAcertos == 3){
            this.vitoriasX ++;
            localStorage.setItem("vitoriasX", JSON.stringify(this.vitoriasX))
            return true;
          }
        }
    } else {
      for (let i = 0; i < this.posicoesParaGanhar.length; i ++) {
        let contadorDeAcertos = 0;
        for (let j = 0; j < this.jogadasY.length; j ++) {
          if (this.posicoesParaGanhar[i][0] == this.jogadasY[j] || this.posicoesParaGanhar[i][1] == this.jogadasY[j] || this.posicoesParaGanhar[i][2] == this.jogadasY[j]) {
            contadorDeAcertos ++
          } 
        }
        if (contadorDeAcertos == 3){
          this.vitoriasY ++;
          localStorage.setItem("vitoriasY", JSON.stringify(this.vitoriasY))
          return true;
        }

      }
    }
  }

  encerraJogo(): void {
    for (let i = 0; i < 9; i ++){
      if ( this.posicoes[i] == "") {
        this.posicoes[i] = "-"
      }
    }
  }
  xganhou(){
  alert("O 'X' ganhou !")
  }

  yganhou(){
    alert("O 'O' ganhou !")
    }

  vitoriasX: number = JSON.parse(localStorage.getItem("vitoriasX")) || 0
  vitoriasY: number = JSON.parse(localStorage.getItem("vitoriasY")) || 0


  resetaPlacar() {
    localStorage.clear();
    window.location.reload();
  }

  fechaModal(){
    var fecAlert = document.getElementById('alert') ;
    fecAlert.style.opacity = '0';
    
  }
  abriModal(){
    var abriAlert = document.getElementById('alert') ;
    abriAlert.style.opacity = '1';
  }

  limparCampos(){
    window.location.reload();
  }
}
