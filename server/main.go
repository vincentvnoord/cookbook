package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/vincentvnoord/recipe-app/api/handlers"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	http.HandleFunc("/", handlers.ScrapeRecipeHandler)
	fmt.Println(fmt.Sprintf("Starting server on :%s", port))
	http.ListenAndServe(":"+port, nil)
}
