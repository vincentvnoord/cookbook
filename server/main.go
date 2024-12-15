package main

import (
	"fmt"
	"net/http"

	"github.com/vincentvnoord/recipe-app/api/handlers"
)

func main() {
	http.HandleFunc("/", handlers.ScrapeRecipeHandler)
	fmt.Println("Starting server on :8080")
	http.ListenAndServe(":8080", nil)
}
