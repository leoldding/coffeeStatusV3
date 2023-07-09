package coffee

import (
	"encoding/json"
	"github.com/leoldding/coffeeStatusV3/database"
	"log"
	"net/http"
)

// Status tracks the status
type Status struct {
	Status string `json:"status"`
}

// StatusUpdate allows the admin to change the displayed status on the web page
func StatusUpdate(w http.ResponseWriter, r *http.Request) {
	// check if session token exists
	sessionToken, err := r.Cookie("coffeeToken")
	if err != nil {
		log.Printf("Session 'coffeeToken' does not exist.\nERROR: %v", err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	regenerateSession(w, sessionToken)

	// retrieve new status from query
	var status Status
	err = json.NewDecoder(r.Body).Decode(&status)
	if err != nil {
		log.Printf("Status update JSON decoding error.\nERROR: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// update status values in table
	_, err = database.Postgres.Exec("UPDATE coffeeStatus SET status = $1", status.Status)
	if err != nil {
		log.Printf("Error updating status in coffeeStatus table.\nERROR: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	return
}

// RetrieveStatus retrieves that current status as it is in the database to display on the web pag
func RetrieveStatus(w http.ResponseWriter, _ *http.Request) {
	var statusJSON Status
	var status string

	// get status from database
	row := database.Postgres.QueryRow("SELECT * FROM coffeeStatus")
	err := row.Scan(&status)
	if err != nil {
		log.Printf("Error retrieving status from coffeeStatus table.\nERROR: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// return status as JSON object
	statusJSON.Status = status

	returnStatus, err := json.Marshal(&statusJSON)
	if err != nil {
		log.Printf("Error marshalling status to JSON.\nERROR: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(returnStatus)
	return
}
