const express = require('express')
const redis = require('redis')

const redisClient = redis.createClient()
redisClient.connect()

const getOrSetData = async (key, callback) => {
  const data = await redisClient.get(key)
  if (data) return JSON.parse(data)
  const newData = await callback()
  await redisClient.setEx(key, 3600, JSON.stringify(newData))
  return newData
}

const app = express()
const PORT = process.env.PORT

app.get('/', async (req, res) => {
  const key = `redis-key`
  const fetchPhotos = async () => {
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/photos`
    ).then(res => res.json())
    return data
  }
  const photos = await getOrSetData(key, fetchPhotos)
  res.json({
    photos: photos[0],
    server: `Sending data from PORT:${PORT}`,
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`)
})
