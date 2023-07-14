package websocket

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

func PingWS(w http.ResponseWriter, r *http.Request) {
	log.Print("PingWS: Attempting to connect to " + r.URL.String())

	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("PingWS: Error upgrading connection to WebSocket.\nERROR: %v", err)
	}

	log.Print("PingWS: Successful connection to " + r.URL.String())

	ticker := time.NewTicker(30 * time.Second)

	for range ticker.C {
		if err := ws.WriteMessage(websocket.PingMessage, []byte{}); err != nil {
			return
		}
	}
}
