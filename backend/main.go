package main

import (
	"github.com/leoldding/coffeeStatusV3/coffee"
	"github.com/leoldding/coffeeStatusV3/database"
	"net/http"
)

func main() {
	http.HandleFunc("/ping", ping)

	database.ConnectToPostgres()

	coffee.DatabaseInitialize()

	http.HandleFunc("/coffeeCheckSession", coffee.CheckSession)
	http.HandleFunc("/coffeeLogin", coffee.Login)
	http.HandleFunc("/coffeeLogout", coffee.Logout)
	http.HandleFunc("/coffeeStatusUpdate", coffee.StatusUpdate)
	http.HandleFunc("/coffeeRetrieveStatus", coffee.RetrieveStatus)
	http.HandleFunc("/ws/coffeeWS", coffee.StatusWS)

	go coffee.Pub.Publish()

	http.ListenAndServe(":8080", nil)
	return
}

func ping(w http.ResponseWriter, _ *http.Request) {
	w.WriteHeader(http.StatusOK)
	return
}
