const useGenre = (selectedGenres) => {
  // Accepts the selectedGenres and return comma-separated-string values
  if (selectedGenres.length < 1) {
    return
  } else {
    const genreIds = selectedGenres.map(g => g.id)
    return genreIds.reduce((acc, currentValue) => acc + ','+currentValue)
  }
}

export default useGenre
