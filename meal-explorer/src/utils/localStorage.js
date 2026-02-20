const LIKED_KEY = "likedMeals";

export function getLikedMeals() {
  try {
    const data = localStorage.getItem(LIKED_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleLikeMeal(id) {
  const liked = getLikedMeals();
  const index = liked.indexOf(id);
  if (index === -1) {
    liked.push(id);
  } else {
    liked.splice(index, 1);
  }
  localStorage.setItem(LIKED_KEY, JSON.stringify(liked));
  window.dispatchEvent(new CustomEvent("likedMealsUpdated"));
}

export function isLiked(id) {
  return getLikedMeals().includes(id);
}
