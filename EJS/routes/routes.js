const e = require('express')
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const members = require('../model/Member')

const router = express.Router()

// Get all members
router.get('/', (req, res, next) => {
  res.json(members)
})

// Get one member
router.get('/:id', (req, res, next) => {
  const found = members.some((member) => member.id === req.params.id)

  if (found) {
    res.json(members.filter(member => {
      return member.id === req.params.id
    }))
  } else {
    // 400 - bad request
    res.status(400).json({msg: `No member with the id of ${req.params.id}`})
  }
})

// Create a member
router.post('/post', (req, res, next) => {
  const newMember = {
    id: uuidv4(),
    status: "active",
    ...req.body
  }

  members.push(newMember)
  res.redirect('/')

})

// Update a member
router.put('/update/:id', (req, res, next) => {
  const found = members.some((member) => member.id === req.params.id)

  if (found) {
    const updatedMember = members.map((member) => {
      if (member.id === req.params.id) {
        return {
          ...member,
          ...req.body
        }
      }
      return member
    })
    res.json({msg: 'Member updated', updatedMember})
  } else {
    res.status(400).json({msg: `Unable to update with member of id: ${req.params.id}`})
  }
})

// Delete a member
router.delete('/delete/:id', (req, res, next) => {
  const found = members.some((member) => member.id === req.params.id)

  if (found) {

    res.json({
      msg: "Member deleted successfully",
      member: members.filter(member => member.id !== req.params.id)
    })
  } else {
    res.status(400).json({msg: `No member with id of ${req.params.id}`})

  }
})

module.exports = router