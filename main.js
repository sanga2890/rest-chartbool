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

$.ajax({
        'url': 'http://157.230.17.132:4025/sales',
        'method': 'GET',
        'success': function(data) {
            vendite = data;
            console.log(vendite);
        },
    'error': function() {
        alert('si è verificato un errore');
    }
});
