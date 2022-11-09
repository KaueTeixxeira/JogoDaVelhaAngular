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
    
   this.rodadas ++;
    if (this.posicoes[index] == "") {
      this.posicoes[index] = this.jogadorDaVez
      this.escolhidos.push(index)
      this.colocaJogada(index)
      if (this.verificaVencedor(this.jogadorDaVez)) {
        this.encerraJogo();
      }
      this.verificaVez();
    } else {
      console.log("ja tem amigao")
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
            alert("O 'X' é o vencedor !")
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
          alert("O 'O' é o vencedor !")
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


  vitoriasX: number = JSON.parse(localStorage.getItem("vitoriasX")) || 0
  vitoriasY: number = JSON.parse(localStorage.getItem("vitoriasY")) || 0


  resetaPlacar() {
    localStorage.clear();
    window.location.reload();
  }


 
}
