// ChartBool
// (repo: rest-chartbool)
// In questo esercizio vogliamo replicare una richiesta comune in varie aziende: la
// creazione di una dashboard (o cruscotto) che riassuma in una unica schermata tutti
// gli indicatori essenziali per valutare l’andamento dell’azienda (altrimenti detti KPI,
// Key Performance Indicator ).
// Gli indicatori sono spesso rappresentati con grafici (a linea, a barre, a torta, etc) per
// evidenziarne l’andamento temporale e permettere una lettura immediata.
// In questo esercizio, utilizziamo la libreria ChartJs ( http://www.chartjs.org/ ) che ci
// permette di creare semplicemente grafici per la Dashboard aziendale mentre i dati
// verranno presi da una API.

// Milestone 1:
// Facendo una chiamata GET all’endpoint /sales , l’API ci ritornerà la lista di tutte le
// vendite fatte dai venditori dell’azienda:

// Indirizzo API: 157.230.17.132:4025/sales


// faccio partire chiamata ajax per ricavare la lista delle vendite;
$.ajax({
        'url': 'http://157.230.17.132:4025/sales',
        'method': 'GET',
        'success': function(data) {
            vendite = data;
            console.log(vendite);

            // richiamo la funzione per ciclare il risultato otteneto dall'API;
            ciclo_vendite(vendite)
        },
    'error': function() {
        alert('si è verificato un errore');
    }
});

// funzione per ciclare l'array ricevuto come risposta dall'API;
function ciclo_vendite(vendite) {
    for (var i = 0; i < vendite.length; i++) {
        var vendita = vendite[i]
        console.log(vendita);
        month(vendita.date)
    }
}

function month(date) {
    var check = moment(date, 'DD/MM/YYYY')
    var month = check.format('M')
    console.log(month);
}


// Da questi dati dobbiamo creare due grafici:
// 1. Andamento delle vendite totali della nostra azienda con un grafico di tipo Line
// (http://www.chartjs.org/docs/latest/charts/line.html) con un unico dataset che
// conterrà il numero di vendite totali mese per mese nel 2017.
