package coffee

import (
	"github.com/gorilla/websocket"
)

type statusText struct {
	text []byte
}

type connection struct {
	ws         *websocket.Conn
	sendStatus chan []byte
}

type subscriber struct {
	conn *connection
}

type publisher struct {
	broadcast   chan statusText
	register    chan subscriber
	deregister  chan subscriber
	connections map[*connection]bool
}
