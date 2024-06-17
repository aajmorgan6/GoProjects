package recipes

type Recipe struct {
	Name string `json:"name"`
	// Ingredients []Ingredient `json:"ingredients"`
	Ingredients string `json:"ingredients"`
}

// type Ingredient struct {
// 	Name     string `json:"name"`
// 	Quantity string `json:"quantity"`
// }
