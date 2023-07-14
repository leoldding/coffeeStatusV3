package coffee

import (
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func StatusWS(w http.ResponseWriter, r *http.Request) {
	log.Println("ATTEMPTING TO CONNECT TO: " + r.URL.String())

	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("Error upgrading connection to WebSocket: %v", err)
	}
	log.Printf("Successful connection to WebSocket.")

	conn := &connection{ws: ws, sendStatus: make(chan []byte, 256)}
	sub := subscriber{conn: conn}
	Pub.register <- sub
	go sub.readStatus()
}

func (sub subscriber) readStatus() {
	c := sub.conn

	defer func() {
		Pub.deregister <- sub
		c.ws.Close()
	}()

	for {
		_, status, err := c.ws.ReadMessage()
		if err != nil {
			log.Printf("Subscriber message reading error.\nERROR: %v", err)
			break
		}
		s := statusText{status}
		Pub.broadcast <- s
	}
}
