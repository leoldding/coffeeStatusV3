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
	log.Print("ATTEMPTING TO CONNECT TO: " + r.URL.String())

	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("Error upgrading connection to WebSocket: %f", err)
	}

	log.Print("SUCCESSFUL CONNECTION TO: " + r.URL.String())

	ticker := time.NewTicker(30 * time.Second)

	for range ticker.C {
		if err := ws.WriteMessage(websocket.PingMessage, []byte{}); err != nil {
			return
		}
	}
}
