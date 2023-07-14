package coffee

import (
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"time"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func StatusWS(w http.ResponseWriter, r *http.Request) {
	log.Println("StatusWS: Attempting to connect to " + r.URL.String())

	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("StatusWS: Error upgrading connection to WebSocket.\nERROR: %v", err)
	}
	log.Printf("StatusWS: Successful connection to " + r.URL.String())

	conn := &connection{ws: ws, sendStatus: make(chan []byte, 256)}
	sub := subscriber{conn: conn}
	Pub.register <- sub
	go sub.writeStatus()
}

func (sub subscriber) writeStatus() {
	c := sub.conn

	defer func() {
		Pub.deregister <- sub
		c.ws.Close()
	}()

	ticker := time.NewTicker(30 * time.Second)

	for {
		select {
		case status, ok := <-c.sendStatus:
			if !ok {
				c.ws.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
			if err := c.ws.WriteMessage(websocket.TextMessage, status); err != nil {
				return
			}
		case <-ticker.C:
			if err := c.ws.WriteMessage(websocket.PingMessage, []byte{}); err != nil {
				return
			}
		}
	}
}
