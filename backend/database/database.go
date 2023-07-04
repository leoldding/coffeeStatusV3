package database

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"log"
	"os"
)

var Postgres *sql.DB

func ConnectToPostgres() {
	// create postgres uri
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s "+"password=%s dbname=%s sslmode=disable", os.Getenv("PGHOST"), os.Getenv("PGPORT"), os.Getenv("PGUSER"), os.Getenv("PGPASSWORD"), os.Getenv("PGDATABASE"))

	var err error

	// connect to Postgres database
	Postgres, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Printf("Error connecting to Postgres database: %v", err)
	} else {
		log.Printf("Succcessful connection to Postgres database.")
	}
	return
}
