const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce((acc, num) => acc + num.likes, 0)
  return sum
}

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.reduce((max, num) => (num.likes > max.likes ? num : max), blogs[0])
  return mostLikes
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog,
}