package coffee

import "log"

var Pub = publisher{
	broadcast:   make(chan statusText),
	register:    make(chan subscriber),
	deregister:  make(chan subscriber),
	connections: make(map[*connection]bool),
}

func (pub *publisher) Publish() {
	for {
		select {
		case sub := <-pub.register:
			log.Println("Registering new connection.")
			pub.connections[sub.conn] = true
		case sub := <-pub.deregister:
			log.Println("Deregistering connection.")
			if _, ok := pub.connections[sub.conn]; ok {
				delete(pub.connections, sub.conn)
				close(sub.conn.sendStatus)
			}
		case status := <-pub.broadcast:
			for conn := range pub.connections {
				select {
				case conn.sendStatus <- status.text:
				default:
					close(conn.sendStatus)
					delete(pub.connections, conn)
				}
			}
		}

	}
}
