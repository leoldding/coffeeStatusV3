package coffee

import (
	"database/sql"
	"encoding/json"
	"github.com/leoldding/coffeeStatusV3/database"
	"golang.org/x/crypto/bcrypt"
	"log"
	"net/http"
	"time"
)

// User is struct that holds username and password for the incoming authentication request
type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// Login attempts to authenticate the user as an admin of the coffeeStatus system
func Login(w http.ResponseWriter, r *http.Request) {
	var user User

	// decode incoming
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		log.Printf("Coffee login JSON decoding error.\nERROR: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
	}

	var password []byte

	// retrieve stored encrypted password from database
	row := database.Postgres.QueryRow("SELECT password FROM coffeeAdmins WHERE adminname = $1", user.Username)
	err = row.Scan(&password)
	if err != nil {
		if err == sql.ErrNoRows {
			log.Printf("Admin does not exist in coffeeAdmins table.\nERROR: %v", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		} else {
			log.Printf("Coffee login row scan error.\nERROR: %v", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

	// compare inputted password and stored encrypted password
	err = bcrypt.CompareHashAndPassword(password, []byte(user.Password))
	if err != nil {
		log.Printf("Coffee admin incorrect password.\nERROR: %v", err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	createNewSession(w, user.Username)

	w.WriteHeader(http.StatusOK)
	return
}

// Logout removes session tokens such that user must login again to access admin page
func Logout(w http.ResponseWriter, r *http.Request) {
	sessionToken, err := r.Cookie("coffeeToken")
	if err != nil {
		log.Printf("coffeeToken was not found.\nERROR: %v", err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "coffeeToken",
		Value:    "",
		Expires:  time.Unix(0, 0),
		HttpOnly: true,
		Path:     "/",
	})

	_, err = database.Postgres.Exec("DELETE FROM coffeeSessions WHERE sessionname = $1", sessionToken.Value)
	if err != nil {
		log.Printf("Error deleting session from coffeeSessions table.\nERROR: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusOK)
	return
}
