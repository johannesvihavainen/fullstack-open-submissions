const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce((acc, num) => acc + num.likes, 0)
  return sum
}

module.exports = {
  dummy, 
  totalLikes,
}