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

// Da questi dati dobbiamo creare due grafici:
// 1. Andamento delle vendite totali della nostra azienda con un grafico di tipo Line
// (http://www.chartjs.org/docs/latest/charts/line.html) con un unico dataset che
// conterrà il numero di vendite totali mese per mese nel 2017.


// 2.Il   secondo   grafico   è   quello   a   torta (http://www.chartjs.org/docs/latest/charts/doughnut.html)   che   evidenzierà   il contributo   di   ogni   venditore   per   l’anno   2017.   Il   valore   dovrà   essere   la percentuale   di   vendite   effettuate   da   quel   venditore   (fatturato_del   venditore   / fatturato_totale)


// faccio partire chiamata ajax per ricavare la lista delle vendite;
$.ajax({
        'url': 'http://157.230.17.132:4025/sales',
        'method': 'GET',
        'success': function(data) {
            vendite = data;

            // richiamo la funzione per ciclare il risultato otteneto dall'API;
            ciclo_vendite(vendite);

            // estraggo i valori dell'oggetto mesi indicante la vendita per ciascun mese;
            var valori = Object.values(mesi);

            // richiamo la funzione per generare il grafico;
            create_chart(valori);

        },
    'error': function() {
        alert('si è verificato un errore');
    }
});

// funzione per ciclare l'array ricevuto come risposta dall'API;

var mesi = {};
var sellers = {}
var fatturato_totale = 0;
function ciclo_vendite(vendite) {

    for (var i = 0; i < vendite.length; i++) {
        var vendita = vendite[i];

        var valore_vendita_corrente = parseInt(vendita.amount);
        var current_month = extract_month(vendita.date);
        var current_seller = vendita.salesman;

        fatturato_totale += valore_vendita_corrente;


        if(!mesi.hasOwnProperty(current_month)) {
            mesi[current_month] = valore_vendita_corrente;
        } else {
            mesi[current_month] += valore_vendita_corrente;
        }

        if(!sellers.hasOwnProperty(current_seller)) {
            sellers[current_seller] = valore_vendita_corrente;
        } else {
            sellers[current_seller] += valore_vendita_corrente;
        }
    }
    console.log(fatturato_totale);
    var values = Object.values(sellers);
    var percentuali = [];
    for (var i = 0; i < values.length; i++) {
        var valore_corrente = values[i]
        percentuali.push(((valore_corrente / fatturato_totale ) * 100).toFixed(2));


    }
    var chiavi = Object.keys(sellers)

    // richiamo funzione per generare il secondo grafico;
    grafico_vendite_percentuale(chiavi, percentuali)


}

console.log(sellers);


// funzione per ricavare solo il mese dalla data completa;
function extract_month(date) {
    var check = moment(date, 'DD/MM/YYYY');
    var month = check.format('M');
    return month
}

// funzione per creare il grafico con chartjs;
function create_chart(valori) {

    // creo il grafico con chartjs;
    var ctx = $('#myChart')[0].getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [ 'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre' ],
            datasets: [{
                label: 'Fatturato',
                data: valori,
                backgroundColor: [
                    'transparent',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                pointBorderColor: [
                    '#7ED3B2',
                    '#4f3a65',
                    '#A6CB12',
                    '#FC3A52',
                    '#CCA8E9',
                    '#6699CC',
                    '#85EF47',
                    '#FFD400',
                    '#C5C5C5',
                    '#FFD5FF',
                    '#3F59DA',
                ],
                borderWidth: 4,
                lineTension: 0,
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Fatturato anno 2017 suddiviso per mese'
            }
        }
    });
}

// disegno il secondo grafico a torta;
// creo una funzione;

function grafico_vendite_percentuale(chiavi, percentuali) {
    // creo il grafico con chartjs;
    var ctx = $('#myChart2')[0].getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: chiavi,
            datasets: [{
                data: percentuali ,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)'
                ],
                borderWidth: 2,
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Fatturato anno 2017 suddiviso in percentuale per ogni venditore'
            }
        }
    });
}

// Milestone   2:
// Ora   vogliamo   dare   la   possibilità   di   aggiungere   vendite. Creiamo   due   select,   una   contenente   i   nostri   venditori   e   l’altra   contenente   i mesi   dell’anno   e   una   input   per   inserire   il   valore   della   vendita. Aggiungiamo   un   bottone   e   onClick   dovremo   aggiungere   una   vendita   del valore   inserito   al   venditore   selezionato   per   il   mese   selezionato,   facendo   una chiamata   POST   a   /sales. I   grafici   andranno   modificati   mostrando   i   nuovi   dati.



var aggiungi_vendita = {};

$('button').click(function() {
    var venditore = $('.sellers').val();
    var input_val = $('.valore').val();
    var mese = $('.months').val();
    aggiungi_vendita['salesman'] = venditore;
    aggiungi_vendita['amount'] = parseInt(input_val);
    aggiungi_vendita['date'] = mese;

    //
    $.ajax({
            'url': 'http://157.230.17.132:4025/sales',
            'method': 'POST',
            'data': aggiungi_vendita,
            'success': function(data){
                console.log(data);
            },
        'error': function() {
            alert('si è verificato un errore');
        }
    });
})

console.log(aggiungi_vendita);
