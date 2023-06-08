import {everywhere, zdefiniujZap, Londyn, Bruksela, Amsterdam, Kopenhaga, Warszawa, Moskwa, Paryż, Berlin, Lizbona, Madryt, Rzym, Wiedeń, Bukareszt, Kijów, Helsinki, Sztokholm, Oslo} from './siec.js';

let Europa = [Londyn, Bruksela, Amsterdam, Kopenhaga, Warszawa, Moskwa, Paryż, Berlin, Lizbona, Madryt, Rzym, Wiedeń, Bukareszt, Kijów, Helsinki, Sztokholm, Oslo]

//zalewanie sieci

everywhere(nest => {
    nest.state.zalewanie = [];
    nest.state.connections = new Map;
    nest.state.connections.set(nest.name, nest.neighbors);
});

function sendZalewanie(nest, message, exceptFor = null) {
    nest.state.zalewanie.push(message);
    for(let neighbor of nest.neighbors) {
        if (neighbor == exceptFor) continue;
        request(nest, neighbor, "zalewanie", message);
    }
}

requestType("zalewanie", (nest, message, source) => {
    if(nest.state.zalewanie.includes(message)) return;
    console.log(`${nest.name} otrzymała wiadomośc '${message}' od ${source}`);
    sendZalewanie(nest, message, source)
})

Warszawa.send("Moskwa", "zalewanie", "proba", () => {console.log("notka wyruszyla")})

//wyslanie zapytania

class Timeout extends Error {}
function request(nest, target, type, content) {
    return new Promise((resolve, reject) => {
        let done = false;
        function attempt(n) {
            nest.send(target, type, content, (failed, value) => {
                done = true;
                if(failed) reject(failed);
                else resolve(value);
            });
            setTimeout(() => {
                if (done) return;
                else if (n < 3) attempt(n + 1);
                else reject(new Timeout("Czas minął."));
            }, 250);
        }
        attempt(1);
    })
}

//definiowanie zapytan

function requestType(name, handler) {
    zdefiniujZap(name, (nest, content, source, callback) => {
        try {
            Promise.resolve(handler(nest, content, source))
            .then(response => callback(null, response), 
                failure => callback(failure));
        } catch (exception) {
            callback(exception);
        }
    });
}

//szukanie najkrotszej drogi

function SzukajDrogi(from, to) {
    let nawi = [{at: from, via: null}];
    for (let i = 0; i < nawi.length; i++) {
        let {at, via} = nawi[i]
        for(let m=0; m<Europa.length; m++){
            if (at == Europa[m].name){
                var connections = Europa[m].state.connections
            }
        }
        for(let next of connections.get(at)) {
            if(next == to) return via
            if (!nawi.some(w => w.at == next)) {
                nawi.push({at: next, via: via || next});
            }
        }

    }
    return null;
}

function ZnajdzTrase(from,to) {
    if(from!==to && from!==null)
    {
        let via = SzukajDrogi(from,to)
        console.log(`${from} --> ${via||to}`)
        ZnajdzTrase(via, to)
    }
}

ZnajdzTrase("Lizbona","Helsinki")