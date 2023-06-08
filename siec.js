const connections = [
    "Londyn-Bruksela", "Londyn-Paryż", "Paryż-Bruksela",
    "Paryż-Lizbona", "Paryż-Madryt", "Madryt-Lizbona",
    "Madryt-Rzym", "Rzym-Wiedeń", "Wiedeń-Berlin",
    "Berlin-Amsterdam", "Amsterdam-Bruksela", "Amsterdam-Kopenhaga",
    "Kopenhaga-Warszawa", "Warszawa-Moskwa", "Moskwa-Kijów",
    "Warszawa-Kijów", "Kijów-Bukareszt", "Warszawa-Bukareszt",
    "Bukareszt-Wiedeń", "Bukareszt-Berlin", "Kopenhaga-Berlin",
    "Kopenhaga-Oslo", "Kopenhaga-Sztokholm", "Oslo-Helsinki", 
    "Helsinki-Moskwa"
  ]
  
    class Network {
      constructor(connections) {
        let ObConnect = Object.create(null)
        for (let [from, to] of connections.map(conn => conn.split("-"))) {
          ;(ObConnect[from] || (ObConnect[from] = [])).push(to)
          ;(ObConnect[to] || (ObConnect[to] = [])).push(from)
        }
        this.nodes = Object.create(null)
        for (let name of Object.keys(ObConnect))
          this.nodes[name] = new Node(name, ObConnect[name], this)
        this.types = Object.create(null)
      }
  
      zdefiniujZap(name, alg) {
        this.types[name] = alg
      }
  
      everywhere(f) {
        for (let node of Object.values(this.nodes)) f(node)
      }
    }
  
    const $network = Symbol("network")
  
    function ser(value) {
      return value == null ? null : JSON.parse(JSON.stringify(value))
    }
  
    class Node {
      constructor(name, neighbors, network, storage) {
        this.name = name
        this.neighbors = neighbors
        this[$network] = network
        this.state = Object.create(null)
      }
  
      send(to, type, info, callback) {
        let toNode = this[$network].nodes[to]
        if (!toNode || !this.neighbors.includes(to))
          return callback(new Error(`Nie ma drogi do ${to} z ${this.name}`))
        let alg = this[$network].types[type]
        if (!alg)
          return callback(new Error("Nie zdefiniowano " + type))
        if (Math.random() > 0.03) setTimeout(() => {
          try {
            alg(toNode, ser(info), this.name, (error, response) => {
              
              setTimeout(() => callback(error, ser(response)), 10)
            })
          } catch(e) {
            callback(e)
          }
        }, 5 + Math.floor(Math.random() * 10))
      }
    }

  let network = new Network(connections)
  export const Wiedeń = network.nodes["Wiedeń"]
  export const Amsterdam = network.nodes["Amsterdam"]
  export const Londyn = network.nodes["Londyn"]
  export const Paryż = network.nodes["Paryż"]
  export const Madryt = network.nodes["Madryt"]
  export const Lizbona = network.nodes["Lizbona"]
  export const Rzym = network.nodes["Rzym"]
  export const Kopenhaga = network.nodes["Kopenhaga"]
  export const Berlin = network.nodes["Berlin"]
  export const Warszawa = network.nodes["Warszawa"]
  export const Moskwa = network.nodes["Moskwa"]
  export const Kijów = network.nodes["Kijów"]
  export const Bruksela = network.nodes["Bruksela"]
  export const Bukareszt = network.nodes["Bukareszt"]
  export const Helsinki = network.nodes["Helsinki"]
  export const Oslo = network.nodes["Oslo"]
  export const Sztokholm = network.nodes["Sztokholm"]
  export const everywhere = network.everywhere.bind(network)
  export const zdefiniujZap = network.zdefiniujZap.bind(network)
  
  function zesralemsie(chuj)
  {
    console.log(chuj)
  }
  zesralemsie("jebacZydow")