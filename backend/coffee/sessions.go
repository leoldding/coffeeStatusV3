package coffee

import (
	"github.com/google/uuid"
	"github.com/leoldding/coffeeStatusV3/database"
	"log"
	"net/http"
	"time"
)

// check if a given cookie has expired
func isCookieExpired(c *http.Cookie) bool {
	return time.Now().Before(c.Expires)
}

// CheckSession checks to see if the corresponding session token exists
func CheckSession(w http.ResponseWriter, r *http.Request) {
	// retrieve token if it exists
	sessionToken, err := r.Cookie("coffeeToken")
	if err != nil {
		log.Printf("Cookie 'coffeeToken' does not exist.\nERROR: %v", err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	regenerateSession(w, sessionToken)

	w.WriteHeader(http.StatusOK)
	return
}

// creates a new session for the current user
func createNewSession(w http.ResponseWriter, username string) {
	// generate token id and expiration time
	sessionToken := uuid.New().String()
	expiresAt := time.Now().Add(10 * time.Minute)

	// add session into table
	_, err := database.Postgres.Exec("INSERT INTO coffeeSessions(sessionname, username, expiration) VALUES ($1, $2, $3);", sessionToken, username, expiresAt)
	if err != nil {
		log.Printf("Error inserting new session into coffeeSessions table.\nERROR: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// set new cookie in browser memory
	http.SetCookie(w, &http.Cookie{
		Name:     "coffeeToken",
		Value:    sessionToken,
		Expires:  expiresAt,
		HttpOnly: true,
		Path:     "/",
	})
}

// create a new session token if the current session token has not expired
func regenerateSession(w http.ResponseWriter, sessionToken *http.Cookie) {
	// check if the token has expired
	if isCookieExpired(sessionToken) {
		_, err := database.Postgres.Exec("DELETE FROM coffeeSessions WHERE sessionname = $1", sessionToken.Value)
		if err != nil {
			log.Printf("Error deleting session from coffeeSessions table.\nERROR: %v", err)
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		log.Printf("Session 'coffeeToken' has expired.\nERROR %v", err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// create new session for user if previous token was not expired
	var username string
	row := database.Postgres.QueryRow("SELECT username FROM coffeeSessions WHERE sessionname = $1", sessionToken.Value)
	err := row.Scan(&username)
	if err != nil {
		log.Printf("Error retrieving username from coffeeSessions table.\nERRROR: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	createNewSession(w, username)
}
