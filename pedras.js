//Atalhos para facilitar escrita das matrizes
var X = true;
var l = false;

var Lesq = [
            //Posição 1
            [    [l,X,l],
                 [l,X,l],
                 [l,X,X]    ],
            //Posição 2
            [    [X,X,X],
                 [X,l,l]    ],
            //Posição 3
            [    [l,X,X],
                 [l,l,X],
                 [l,l,X]    ],
            //Posição 4
            [    [l,l,X],
                 [X,X,X]    ]
    ];

var Ldir = [
            //Posição 1
            [   [l,X,l],
                [l,X,l],
                [X,X,l]     ],
            //Posição 2
            [   [X,X,X],
                [l,l,X]     ],
            //Posição 3
            [   [X,X,l],
                [X,l,l],
                [X,l,l]     ],
            //Posição 4
            [   [X,l,l],
                [X,X,X]     ]
    ];

var Quad = [
            //Posição 1 (Unica)
            [   [X,X,l],
                [X,X,l]     ]
    ];

//Cria um arraypara indexar de forma aleatória uma peça
var todasPedras = [/*Quad, linha, */Lesq, Ldir/*, Te, S1, S2*/];