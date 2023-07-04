package coffee

import (
	"encoding/json"
	"github.com/leoldding/coffeeStatusV3/database"
	"log"
	"net/http"
)

// Status tracks
type Status struct {
	Status    string `json:"status"`
	Substatus string `json:"substatus"`
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

	// retrieve new status and substatus from query
	var status Status
	err = json.NewDecoder(r.Body).Decode(&status)
	if err != nil {
		log.Printf("Status update JSON decoding error.\nERROR: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// update status and substatus values in table
	_, err = database.Postgres.Exec("UPDATE coffeeStatus SET status = $1, substatus = $2", status.Status, status.Substatus)
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
	var fullStatus Status
	var status string
	var substatus string

	// get status from database
	row := database.Postgres.QueryRow("SELECT * FROM coffeeStatus")
	err := row.Scan(&status, &substatus)
	if err != nil {
		log.Printf("Error retrieving status from coffeeStatus table.\nERROR: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// return status and substatus as JSON object
	fullStatus.Status = status
	fullStatus.Substatus = substatus

	returnStatus, err := json.Marshal(&fullStatus)
	if err != nil {
		log.Printf("Error marshalling status to JSON.\nERROR: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(returnStatus)
	return
}
