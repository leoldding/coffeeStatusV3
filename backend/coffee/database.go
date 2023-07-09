package coffee

import (
	"github.com/leoldding/coffeeStatusV3/database"
	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
	"log"
	"os"
)

// DatabaseInitialize creates all necessary tables for the coffeeStatus app if they don't yet exist
func DatabaseInitialize() {
	_, err := database.Postgres.Exec("CREATE TABLE IF NOT EXISTS coffeeSessions(sessionname TEXT PRIMARY KEY, username VARCHAR(40), expiration TIMESTAMP WITH TIME ZONE);")
	if err != nil {
		log.Printf("Error creating coffeeSessions table in Postgres.\nERROR: %v", err)
		return
	}

	_, err = database.Postgres.Exec("CREATE TABLE IF NOT EXISTS coffeeAdmins(adminname VARCHAR(40) PRIMARY KEY, password TEXT);")
	if err != nil {
		log.Printf("Error creating coffeeAdmins table in Postgres.\nERROR: %v", err)
		return
	}

	_, err = database.Postgres.Exec("CREATE TABLE IF NOT EXISTS coffeeStatus(status VARCHAR(40));")
	if err != nil {
		log.Printf("Error creating coffeeStatus table in Postgres.\nERROR: %v", err)
		return
	}

	// add admin account on initial setup
	var count int
	row := database.Postgres.QueryRow("SELECT COUNT(*) FROM coffeeAdmins;")
	err = row.Scan(&count)
	if err != nil {
		log.Printf("Error counting rows in coffeeAdmins table.\nERROR: %v", err)
		return
	}
	if count == 0 {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(os.Getenv("COFFEEADMINPASSWORD")), 8)
		_, err = database.Postgres.Exec("INSERT INTO coffeeAdmins(adminname, password) VALUES ($1, $2);", os.Getenv("COFFEEADMINNAME"), hashedPassword)
		if err != nil {
			log.Printf("Error inserting admin credentials into database.\nERROR: %v", err)
			return
		}
	}

	// add initial status
	row = database.Postgres.QueryRow("SELECT COUNT(*) FROM coffeeStatus;")
	err = row.Scan(&count)
	if err != nil {
		log.Printf("Error counting rows in status.\nERROR %v", err)
		return
	}
	if count == 0 {
		_, err = database.Postgres.Exec("INSERT INTO coffeeStatus(status) VALUES ($1);", "no")
		if err != nil {
			log.Printf("Error inserting status into database.\nERROR: %v", err)
			return
		}
	}

	return
}

// TableDeletion is a temporary function being used to remove the coffeeStatus table
func TableDeletion() {
	_, err := database.Postgres.Exec("DROP TABLE coffeeStatus;")
	if err != nil {
		log.Printf("Error dropping coffeeStatus table in Postgres.\nERROR: %v", err)
		return
	}
}
