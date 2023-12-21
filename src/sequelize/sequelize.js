const sequelize = require('./db')// 

// SEQUELIZE SYNC

sequelize.sync()
  .then(() => {
    console.log('Database synchronized')
  })
  .catch((err) => {
    console.error('Error synchronizing database:', err)
});
// add user

app.post('/signup/add', async (req, res) => {
  const { username, email, password } = req.body

  try {
    const existingEmail = await User.findOne({ where: { email } })

    if (existingEmail) {
      return res.sendStatus('email already taken')
    }

    const existingName = await User.findOne({ where: { username } })

    if (existingName) {
      return res.sendStatus('name already taken')
    }

    function addHash(hash) {
      const newUser = User.build({
        id: Math.random() * 10000,
        username,
        email,
        password: hash
      })
      newUser.save()
      return res.sendStatus(200)
    }

    bcrypt.hash(password, 15, function(err, hash) {
      if (err) {
        console.log(err);
        return res.status(500).sendStatus('Server error')
      } else {
        addHash(hash)
      }
    });

  } catch (err) {
    console.error(err)
    return res.status(500).sendStatus('Server error')
  }
})


app.post('/login/new', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ where: { username } })
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // const accessToken = jwt.sign({ userId: user.id }, 'secret')

    return res.json(200)
  } catch (err) {

    console.error(err);
    return res.status(500).json({ error: 'Server error' })
  }
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});