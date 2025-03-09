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

const mostBlogs = (blogs) => {

  const blogCount = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1
    return acc
  }, {})

  const authorWithMostBlogs = Object.keys(blogCount).reduce((max, author) => {
    return blogCount[author] > blogCount[max] ? author : max
  }, Object.keys(blogCount)[0])


  return {
    author: authorWithMostBlogs,
    blogs: blogCount[authorWithMostBlogs]
  }
}

const mostLikes = (blogs) => {

  const countLikes = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes
    return acc
  }, {})

  const authorWithMostLikes = Object.keys(countLikes).reduce((max, author) => {
    return countLikes[author] > countLikes[max] ? author : max
  }, Object.keys(countLikes)[0])


  return {
    author: authorWithMostLikes,
    likes: countLikes[authorWithMostLikes]
  }

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}