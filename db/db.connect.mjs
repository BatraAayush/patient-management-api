import mongoose from 'mongoose'

const mongoURI = `mongodb+srv://aayushBatra:aayushBatra@cluster0.o5fdz8d.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'PatientManagement'
})
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error)
  })    